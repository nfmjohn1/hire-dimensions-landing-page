import { NextRequest, NextResponse } from "next/server";
import { LeadPayloadSchema } from "@/lib/audit/types";
import { captureLead } from "@/lib/audit/leads";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LeadPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await captureLead(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead]", err);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
