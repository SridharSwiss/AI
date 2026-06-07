import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function geolocate(ip: string): Promise<{ country: string; country_code: string; city: string } | null> {
  // Skip private/loopback addresses
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) return null;
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "success") return null;
    return { country: data.country ?? null, country_code: data.countryCode ?? null, city: data.city ?? null };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, device_type, browser, os, referrer_source, referrer_url, utm_source, utm_medium, utm_campaign } = body;
    if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

    // Resolve visitor IP — Vercel sets x-forwarded-for
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = (forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") ?? "").trim();
    const geo = await geolocate(ip);

    const { error } = await supabase.from("analytics_sessions").insert({
      id: session_id,
      device_type,
      browser,
      os,
      referrer_source,
      referrer_url,
      utm_source,
      utm_medium,
      utm_campaign,
      country: geo?.country ?? null,
      country_code: geo?.country_code ?? null,
      city: geo?.city ?? null,
    });

    if (error) {
      console.error("[analytics/session POST]", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[analytics/session POST] exception", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { session_id, session_duration_secs } = await req.json();
    if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

    const { error } = await supabase
      .from("analytics_sessions")
      .update({ session_duration_secs, last_seen_at: new Date().toISOString() })
      .eq("id", session_id);

    if (error) console.error("[analytics/session PATCH]", error.message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[analytics/session PATCH] exception", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
