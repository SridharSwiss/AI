import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, device_type, browser, os, referrer_source, referrer_url, utm_source, utm_medium, utm_campaign } = body;
    if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

    await supabase.from("analytics_sessions").insert({
      id: session_id,
      device_type,
      browser,
      os,
      referrer_source,
      referrer_url,
      utm_source,
      utm_medium,
      utm_campaign,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { session_id, session_duration_secs } = await req.json();
    if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

    await supabase
      .from("analytics_sessions")
      .update({ session_duration_secs, last_seen_at: new Date().toISOString() })
      .eq("id", session_id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
