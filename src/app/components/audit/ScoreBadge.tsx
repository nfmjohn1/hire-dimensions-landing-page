import type { GradeReport } from "@/lib/audit/types";

const letterColors: Record<string, string> = {
  A: "bg-emerald-600",
  B: "bg-sky-600",
  C: "bg-amber-500",
  D: "bg-orange-600",
  F: "bg-red-700",
};

/** Score badge — uses .text-hd-navy etc. from audit.css when inside .audit-root */
export default function ScoreBadge({
  report,
  size = "lg",
}: {
  report: Pick<GradeReport, "overall" | "letter">;
  size?: "lg" | "sm";
}) {
  const color = letterColors[report.letter] || "bg-hd-navy";
  if (size === "sm") {
    return (
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white ${color}`}
        >
          {report.letter}
        </span>
        <span className="text-2xl font-bold tabular-nums text-hd-navy">
          {report.overall}
        </span>
        <span className="text-sm text-hd-muted">/ 100</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl text-white shadow ${color}`}
      >
        <span className="text-3xl font-bold leading-none">{report.letter}</span>
        <span className="mt-1 text-[10px] uppercase tracking-wider opacity-90">
          grade
        </span>
      </div>
      <div>
        <p className="text-4xl font-bold tabular-nums text-hd-navy">
          {report.overall}
          <span className="text-lg font-medium text-hd-muted">/100</span>
        </p>
        <p className="text-sm text-hd-muted">Overall score</p>
      </div>
    </div>
  );
}
