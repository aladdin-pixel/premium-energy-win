import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Trust nginx proxy so req.ip gives real client IP
app.set("trust proxy", true);

// --- Rate limiting (in-memory) ---
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 15 minutes
const MAX_PER_IP = 5;        // max 5 submissions per IP per window
const MAX_PER_EMAIL = 2;     // max 2 submissions per email per window

const ipHits = new Map();    // ip -> { count, resetAt }
const emailHits = new Map(); // email -> { count, resetAt }

function isRateLimited(map, key, max) {
  const now = Date.now();
  const entry = map.get(key);

  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= max) return true;

  entry.count++;
  return false;
}

// Cleanup stale entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of ipHits) if (now > val.resetAt) ipHits.delete(key);
  for (const [key, val] of emailHits) if (now > val.resetAt) emailHits.delete(key);
}, 30 * 60 * 1000);

// --- MongoDB (persistent connection) ---
let db;
async function getDb() {
  if (!db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db("premium_energy_win");
    console.log("Connected to MongoDB");
  }
  return db;
}

// --- Nodemailer transporter ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- API route ---
app.post("/api/email-submit", async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: "invalid_email" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";

    // Rate limit by IP
    if (isRateLimited(ipHits, ip, MAX_PER_IP)) {
      console.log(`Rate limited IP: ${ip}`);
      return res.status(429).json({ success: false, error: "rate_limited" });
    }

    // Rate limit by email
    if (isRateLimited(emailHits, normalizedEmail, MAX_PER_EMAIL)) {
      console.log(`Rate limited email: ${normalizedEmail}`);
      return res.status(429).json({ success: false, error: "rate_limited" });
    }

    const submittedAt = new Date();
    const userAgent = req.headers["user-agent"] || "unknown";

    // Save to MongoDB and send notification in parallel
    const results = await Promise.allSettled([
      (async () => {
        const database = await getDb();
        await database.collection("email_submissions").updateOne(
          { email: normalizedEmail },
          {
            $setOnInsert: {
              email: normalizedEmail,
              source: source || "unknown",
              ip_address: ip,
              user_agent: userAgent,
              created_at: submittedAt,
            },
            $set: {
              last_seen_at: submittedAt,
              last_ip: ip,
            },
            $inc: { submission_count: 1 },
          },
          { upsert: true }
        );
      })(),

      (async () => {
        const recipients = process.env.NOTIFICATION_EMAILS || "";
        if (!recipients) return;

        await transporter.sendMail({
          from: `"Contest - Smart Energy Pay" <${process.env.SMTP_USER}>`,
          to: recipients,
          subject: `New OTC Request: ${normalizedEmail}`,
          html: `
            <h2>New Email Submission</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;">
              <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${normalizedEmail}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Source:</td><td style="padding:8px;">${source || "unknown"}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">IP Address:</td><td style="padding:8px;">${ip}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">User Agent:</td><td style="padding:8px;">${userAgent}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Submitted At:</td><td style="padding:8px;">${submittedAt.toISOString()}</td></tr>
            </table>
          `,
        });
      })(),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`Task ${i} failed:`, r.reason);
      }
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ success: false, error: "server_error" });
  }
});

// --- Serve frontend in production ---
app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
