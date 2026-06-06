import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { session_id, page_path, page_title, time_spent_secs } = await req.json();
    if (!session_id || !page_path) return NextResponse.json({ error: "missing fields" }, { status: 400 });

    await supabase.from("analytics_pageviews").insert({ session_id, page_path, page_title, time_spent_secs });

    // update page_count on session
    await supabase.rpc("increment_page_count", { sid: session_id });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
