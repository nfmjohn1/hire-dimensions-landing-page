import type { Metadata } from "next";
import AuditTool from "@/app/components/audit/AuditTool";

export const metadata: Metadata = {
  title: "HVAC Job Ad Audit (Embed)",
  robots: { index: false, follow: false },
};

/** Minimal chrome for iframe embed on hiredimensions.com or partners */
export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-[var(--color-mist,#F4F6F9)]">
      <AuditTool embed />
    </div>
  );
}
