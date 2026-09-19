"use client";

import "./audit.css";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  DIMENSION_KEYS,
  DIMENSION_META,
  GradeReport,
  ROLE_TYPES,
  RoleType,
} from "@/lib/audit/types";
import ScoreBadge from "./ScoreBadge";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky";

type Props = {
  embed?: boolean;
};

type FormState = {
  adText: string;
  company: string;
  city: string;
  roleType: RoleType;
  name: string;
  email: string;
  phone: string;
};

const initialForm: FormState = {
  adText: "",
  company: "",
  city: "",
  roleType: "Service",
  name: "",
  email: "",
  phone: "",
};

export default function AuditTool({ embed = false }: Props) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<GradeReport | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [leadSaving, setLeadSaving] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Embed: post document height to parent for iframe resize
  useEffect(() => {
    if (!embed || typeof window === "undefined") return;

    const post = () => {
      const height =
        document.documentElement.scrollHeight ||
        rootRef.current?.scrollHeight ||
        800;
      window.parent?.postMessage(
        { type: "hd-audit-resize", height },
        "*"
      );
    };

    post();
    const ro = new ResizeObserver(post);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener("load", post);
    const id = window.setInterval(post, 1000);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
      window.clearInterval(id);
    };
  }, [embed, report, unlocked, loading, error]);

  const hasEmailAlready = useMemo(
    () => Boolean(form.email.trim() && /\S+@\S+\.\S+/.test(form.email)),
    [form.email]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onGrade(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setReport(null);
    setUnlocked(false);
    setLeadError(null);

    if (form.adText.trim().length < 40) {
      setError("Paste a fuller job ad (at least a few sentences).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Grading failed");
      }
      setReport(data.report as GradeReport);
      if (hasEmailAlready && form.name.trim()) {
        setUnlocked(true);
        void submitLead(data.report as GradeReport, form);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(r: GradeReport, lead: FormState) {
    const payload = {
      company: lead.company,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      score: r.overall,
      letter: r.letter,
      adPreview: lead.adText.slice(0, 500),
      reportSummary: `${r.letter} ${r.overall}/100 — ${r.verdict}`,
      createdAt: new Date().toISOString(),
    };
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Could not save your info");
    }
  }

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    if (!report) return;
    setLeadError(null);

    if (!form.name.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      setLeadError("Name and a valid email are required to unlock the full report.");
      return;
    }

    setLeadSaving(true);
    try {
      await submitLead(report, form);
      setUnlocked(true);
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Could not unlock");
    } finally {
      setLeadSaving(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className={`audit-root ${embed ? "bg-hd-mist" : ""}`}
    >
      {/* Hero */}
      <section
        className={`border-b border-hd-border bg-hd-navy text-white ${
          embed ? "px-4 py-8" : "px-4 py-12 sm:px-6 sm:py-16"
        }`}
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-hd-accent">
            Hire Dimensions · HVAC
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            HVAC Job Ad Audit
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            See if your job ad attracts A-players — or the ones who ghost.
          </p>
          {!embed && (
            <p className="mt-4 max-w-2xl text-sm text-white/65">
              Paste your posting. Get a scored report against how top HVAC shops
              hire — then book a free 20-min Hiring Ad Audit to walk it live.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        {/* Form */}
        <form onSubmit={onGrade} className="hd-card space-y-5">
          <div>
            <label htmlFor="adText" className="hd-label">
              Paste your HVAC job ad <span className="text-hd-accent">*</span>
            </label>
            <textarea
              id="adText"
              required
              rows={embed ? 8 : 12}
              className="hd-input font-mono text-[13px] leading-relaxed"
              placeholder="Paste the full posting here…"
              value={form.adText}
              onChange={(e) => update("adText", e.target.value)}
            />
            <p className="mt-1.5 text-xs text-hd-muted">
              Tip: try the samples in <code className="text-hd-navy">examples/</code>{" "}
              (good / mediocre / bad).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="company" className="hd-label">
                Company
              </label>
              <input
                id="company"
                className="hd-input"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Summit Comfort"
              />
            </div>
            <div>
              <label htmlFor="city" className="hd-label">
                City / metro
              </label>
              <input
                id="city"
                className="hd-input"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Denver"
              />
            </div>
            <div>
              <label htmlFor="roleType" className="hd-label">
                Role type
              </label>
              <select
                id="roleType"
                className="hd-input"
                value={form.roleType}
                onChange={(e) => update("roleType", e.target.value as RoleType)}
              >
                {ROLE_TYPES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="name" className="hd-label">
                Your name
              </label>
              <input
                id="name"
                className="hd-input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Optional now"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="hd-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="hd-input"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Optional now — unlocks full report"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="hd-label">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="hd-input"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Optional"
                autoComplete="tel"
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary hd-btn hd-btn-primary" disabled={loading}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Grading your ad…
                </span>
              ) : (
                "Grade my job ad"
              )}
            </button>
            {report && (
              <button
                type="button"
                className="hd-btn hd-btn-secondary no-print"
                onClick={() => {
                  setReport(null);
                  setUnlocked(false);
                  setError(null);
                }}
              >
                Start over
              </button>
            )}
          </div>
        </form>

        {/* Teaser */}
        {report && (
          <section className="hd-card space-y-5" aria-live="polite">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <ScoreBadge report={report} />
              {report.mode === "heuristic" && (
                <span className="no-print self-start rounded-full bg-hd-mist px-3 py-1 text-xs font-medium text-hd-muted">
                  Demo scorer (add OPENAI_API_KEY for AI)
                </span>
              )}
            </div>
            <p className="text-lg font-medium text-hd-navy">{report.verdict}</p>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-hd-muted">
                Top issues
              </h2>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-hd-navy">
                {report.topIssues.slice(0, 3).map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Lead gate */}
        {report && !unlocked && (
          <section className="hd-card no-print border-hd-accent/30 bg-gradient-to-br from-white to-orange-50/40">
            <h2 className="text-xl font-bold text-hd-navy">
              Unlock your full report
            </h2>
            <p className="mt-1 text-sm text-hd-muted">
              Dimension scores, Top 5 fixes (quoting your ad), and a rewrite
              preview — free. We&apos;ll also send booking details for a live
              walkthrough.
            </p>
            <form onSubmit={onUnlock} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="unlock-name" className="hd-label">
                  Name <span className="text-hd-accent">*</span>
                </label>
                <input
                  id="unlock-name"
                  required
                  className="hd-input"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="unlock-email" className="hd-label">
                  Email <span className="text-hd-accent">*</span>
                </label>
                <input
                  id="unlock-email"
                  type="email"
                  required
                  className="hd-input"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="unlock-company" className="hd-label">
                  Company
                </label>
                <input
                  id="unlock-company"
                  className="hd-input"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="unlock-phone" className="hd-label">
                  Phone
                </label>
                <input
                  id="unlock-phone"
                  type="tel"
                  className="hd-input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              {leadError && (
                <div className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {leadError}
                </div>
              )}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary hd-btn hd-btn-primary"
                  disabled={leadSaving}
                >
                  {leadSaving ? "Unlocking…" : "Show full report"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Full report */}
        {report && unlocked && (
          <FullReport report={report} company={form.company} />
        )}

        {/* Soft pitch */}
        <section className="hd-card no-print bg-hd-navy text-white">
          <h2 className="text-xl font-bold">
            Fill seats with people who stick
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Hire Dimensions helps HVAC owners hire culture-fit A-players —
            technicians who show up, fit the shop, and stay. Your Job Ad Audit
            is the first step: we&apos;ll walk this report live and map how to
            attract keepers instead of giosts.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary hd-btn hd-btn-primary mt-5 inline-flex"
          >
            Book your free 20-min Hiring Ad Audit
          </a>
        </section>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function FullReport({
  report,
  company,
}: {
  report: GradeReport;
  company: string;
}) {
  return (
    <div className="space-y-6" id="full-report">
      <div className="no-print flex flex-wrap gap-3">
        <button
          type="button"
          className="hd-btn hd-btn-secondary"
          onClick={() => window.print()}
        >
          Print / save PDF
        </button>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-primary hd-btn hd-btn-primary">
          Book your free 20-min Hiring Ad Audit
        </a>
      </div>

      <section className="hd-card">
        <h2 className="text-lg font-bold text-hd-navy">Dimension scores</h2>
        <p className="mt-1 text-sm text-hd-muted">
          Weighted to how A-players actually read HVAC ads
          {company ? ` — ${company}` : ""}.
        </p>
        <ul className="mt-5 space-y-4">
          {DIMENSION_KEYS.map((key) => {
            const d = report.dimensions[key];
            const meta = DIMENSION_META[key];
            const pct = Math.round((d.score / 10) * 100);
            return (
              <li key={key} className="border-b border-hd-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="font-semibold text-hd-navy">{meta.label}</p>
                    <p className="text-xs text-hd-muted">
                      {Math.round(meta.weight * 100)}% weight · {meta.description}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-bold tabular-nums text-hd-navy">
                    {d.score}
                    <span className="text-sm font-normal text-hd-muted">/10</span>
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-hd-mist">
                  <div
                    className="h-full rounded-full bg-hd-steel"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-hd-navy/90">{d.note}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="hd-card">
        <h2 className="text-lg font-bold text-hd-navy">Top 5 fixes</h2>
        <p className="mt-1 text-sm text-hd-muted">
          Ranked and specific to your ad — quotes pulled from what you pasted.
        </p>
        <ol className="mt-5 space-y-5">
          {report.topFixes.map((fix) => (
            <li key={fix.rank} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hd-navy text-sm font-bold text-white">
                {fix.rank}
              </span>
              <div>
                <p className="font-semibold text-hd-navy">{fix.title}</p>
                {fix.quote ? (
                  <blockquote className="mt-1 border-l-2 border-hd-accent/50 pl-3 text-sm italic text-hd-muted">
                    “{fix.quote}”
                  </blockquote>
                ) : null}
                <p className="mt-1 text-sm text-hd-navy">{fix.fix}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="hd-card border-hd-steel/30 bg-sky-50/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-hd-navy">Rewrite preview</h2>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-hd-muted ring-1 ring-hd-border">
            Draft for your live audit call
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-hd-navy">
          {report.rewritePreview.hook}
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-hd-navy">
          {report.rewritePreview.offerBullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-hd-muted">
          This is a starting point — we&apos;ll tailor voice, pay bands, and
          culture fit on the Hiring Ad Audit call.
        </p>
      </section>

      <section className="hd-card no-print text-center">
        <h2 className="text-xl font-bold text-hd-navy">
          Ready to walk this live?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-hd-muted">
          Book a free 20-min Hiring Ad Audit. We&apos;ll review this report
          together and map how Hire Dimensions fills seats with culture-fit
          A-players who stay.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-primary hd-btn hd-btn-primary mt-5 inline-flex"
        >
          Book your free 20-min Hiring Ad Audit
        </a>
      </section>
    </div>
  );
}
