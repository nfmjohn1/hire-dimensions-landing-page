import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AuditTool from "@/app/components/audit/AuditTool";

export const metadata: Metadata = {
  title: "HVAC Job Ad Audit",
  description:
    "Paste your HVAC job ad. Get a scored report — then book a free Hiring Ad Audit with Hire Dimensions.",
};

export default function AuditPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AuditTool />
      </main>
      <Footer />
    </div>
  );
}
