import { NextRequest, NextResponse } from "next/server";
import { GradeRequestSchema } from "@/lib/audit/types";
import { gradeJobAd } from "@/lib/audit/grade";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GradeRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const report = await gradeJobAd(parsed.data);
    return NextResponse.json({ report });
  } catch (err) {
    console.error("[api/grade]", err);
    return NextResponse.json(
      { error: "Failed to grade job ad. Try again." },
      { status: 500 }
    );
  }
}
