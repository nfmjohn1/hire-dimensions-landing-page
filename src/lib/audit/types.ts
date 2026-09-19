import { z } from "zod";

export const ROLE_TYPES = [
  "Service",
  "Install",
  "Commercial",
  "Apprentice",
  "Other",
] as const;

export type RoleType = (typeof ROLE_TYPES)[number];

export const DIMENSION_KEYS = [
  "titleClarity",
  "openingHook",
  "offerSpecificity",
  "structureScannability",
  "roleRealism",
  "candidateFilter",
  "ctaFriction",
  "aPlayerAppeal",
] as const;

export type DimensionKey = (typeof DIMENSION_KEYS)[number];

export const DIMENSION_META: Record<
  DimensionKey,
  { label: string; weight: number; description: string }
> = {
  titleClarity: {
    label: "Title clarity",
    weight: 0.1,
    description: "Searchable trade + role type; not cute or vague",
  },
  openingHook: {
    label: "Opening hook",
    weight: 0.2,
    description: "Human, frustration/belonging — not corporate HR",
  },
  offerSpecificity: {
    label: "Offer specificity",
    weight: 0.2,
    description: "Pay range, OT, van/tools, benefits visible early",
  },
  structureScannability: {
    label: "Structure / scannability",
    weight: 0.1,
    description: "Benefits high; short bullets; right section order",
  },
  roleRealism: {
    label: "Role realism",
    weight: 0.1,
    description: "Day-to-day picture, not legalese",
  },
  candidateFilter: {
    label: "Candidate filter quality",
    weight: 0.15,
    description: "Attitude first, lean must-haves, invites near-fits",
  },
  ctaFriction: {
    label: "CTA / friction",
    weight: 0.1,
    description: "One clear apply path; optional next steps",
  },
  aPlayerAppeal: {
    label: "A-player appeal",
    weight: 0.05,
    description: "Would an employed good tech stop scrolling?",
  },
};

export const DimensionScoreSchema = z.object({
  score: z.number().min(0).max(10),
  note: z.string().min(1),
});

export const FixSchema = z.object({
  rank: z.number().int().min(1).max(5),
  title: z.string(),
  quote: z.string().optional().default(""),
  fix: z.string(),
});

export const RewritePreviewSchema = z.object({
  hook: z.string(),
  offerBullets: z.array(z.string()).min(1),
});

export const GradeReportSchema = z.object({
  overall: z.number().min(0).max(100),
  letter: z.enum(["A", "B", "C", "D", "F"]),
  verdict: z.string(),
  dimensions: z.object({
    titleClarity: DimensionScoreSchema,
    openingHook: DimensionScoreSchema,
    offerSpecificity: DimensionScoreSchema,
    structureScannability: DimensionScoreSchema,
    roleRealism: DimensionScoreSchema,
    candidateFilter: DimensionScoreSchema,
    ctaFriction: DimensionScoreSchema,
    aPlayerAppeal: DimensionScoreSchema,
  }),
  topIssues: z.array(z.string()).min(1).max(5),
  topFixes: z.array(FixSchema).min(1).max(5),
  rewritePreview: RewritePreviewSchema,
  mode: z.enum(["ai", "heuristic"]).optional(),
});

export type DimensionScore = z.infer<typeof DimensionScoreSchema>;
export type Fix = z.infer<typeof FixSchema>;
export type RewritePreview = z.infer<typeof RewritePreviewSchema>;
export type GradeReport = z.infer<typeof GradeReportSchema>;

export const GradeRequestSchema = z.object({
  adText: z.string().min(40, "Paste a fuller job ad (at least a few sentences)."),
  company: z.string().optional().default(""),
  city: z.string().optional().default(""),
  roleType: z.enum(ROLE_TYPES).optional().default("Other"),
  name: z.string().optional().default(""),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
});

export type GradeRequest = z.infer<typeof GradeRequestSchema>;

export const LeadPayloadSchema = z.object({
  company: z.string().optional().default(""),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  score: z.number(),
  letter: z.string(),
  adPreview: z.string(),
  reportSummary: z.string(),
  createdAt: z.string().optional(),
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;

export function letterFromScore(overall: number): "A" | "B" | "C" | "D" | "F" {
  if (overall >= 90) return "A";
  if (overall >= 80) return "B";
  if (overall >= 70) return "C";
  if (overall >= 60) return "D";
  return "F";
}

export function weightedOverall(
  dimensions: GradeReport["dimensions"]
): number {
  let sum = 0;
  for (const key of DIMENSION_KEYS) {
    sum += dimensions[key].score * DIMENSION_META[key].weight * 10;
  }
  return Math.round(Math.min(100, Math.max(0, sum)));
}
