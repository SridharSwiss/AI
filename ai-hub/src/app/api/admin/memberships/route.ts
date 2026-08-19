import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function authed(key: string | null | undefined) {
  return key === process.env.ANALYTICS_ADMIN_KEY;
}

/** PATCH — approve/reject a membership application. */
export async function PATCH(req: NextRequest) {
  let body: { key?: string; id?: string; status?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (!authed(body.key)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id, status, notes } = body;
  if (!id || !status || !["approved", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "id and valid status required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("switzerland_memberships")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      ...(notes !== undefined ? { review_notes: notes } : {}),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
