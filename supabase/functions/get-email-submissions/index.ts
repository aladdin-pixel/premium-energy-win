import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory cache for IP lookups (per invocation)
const ipCache = new Map<string, { country_code: string; country_name: string }>();

async function lookupIP(ip: string): Promise<{ country_code: string; country_name: string }> {
  if (!ip || ip === "unknown") return { country_code: "", country_name: "" };
  
  if (ipCache.has(ip)) return ipCache.get(ip)!;

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode,country`);
    if (res.ok) {
      const data = await res.json();
      const result = {
        country_code: data.countryCode || "",
        country_name: data.country || "",
      };
      ipCache.set(ip, result);
      return result;
    }
  } catch (e) {
    console.error("IP lookup failed for", ip, e);
  }
  return { country_code: "", country_name: "" };
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  const codePoints = [...code.toUpperCase()].map(
    (c) => 0x1f1e6 + c.charCodeAt(0) - 65
  );
  return String.fromCodePoint(...codePoints);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("email_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("DB error:", error);
      return new Response(JSON.stringify({ success: false, error: "db_error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Deduplicate IPs for batch lookup
    const uniqueIPs = [...new Set((data || []).map((r: any) => r.ip_address).filter(Boolean))];
    
    // Lookup all unique IPs (ip-api has rate limits ~45/min, so limit)
    const lookupPromises = uniqueIPs.slice(0, 45).map(async (ip: string) => {
      const result = await lookupIP(ip);
      return [ip, result] as const;
    });
    const lookupResults = await Promise.all(lookupPromises);
    const ipMap = new Map(lookupResults);

    const enriched = (data || []).map((row: any) => {
      const geo = ipMap.get(row.ip_address) || { country_code: "", country_name: "" };
      return {
        ...row,
        country_code: geo.country_code,
        country_name: geo.country_name,
        flag: countryCodeToFlag(geo.country_code),
      };
    });

    return new Response(JSON.stringify({ success: true, data: enriched }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ success: false, error: "server_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
