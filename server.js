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
    const submittedAt = new Date();
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";
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
