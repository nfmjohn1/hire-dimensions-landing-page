import {
  GradeReport,
  GradeRequest,
  letterFromScore,
  weightedOverall,
  DimensionKey,
  DIMENSION_KEYS,
} from "./types";

function clamp(n: number, min = 0, max = 10) {
  return Math.max(min, Math.min(max, n));
}

function hasAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function countMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce((n, p) => n + (p.test(text) ? 1 : 0), 0);
}

const CORPORATE_JARGON = [
  /dynamic\s+self[- ]?starter/i,
  /fast[- ]paced\s+environment/i,
  /hit\s+the\s+ground\s+running/i,
  /rock\s*star/i,
  /ninja/i,
  /guru/i,
  /synergy/i,
  /go[- ]getter/i,
  /team\s+player/i,
  /passionate\s+about\s+excellence/i,
  /competitive\s+(pay|salary|compensation)/i,
  /doe\b/i,
  /depending\s+on\s+experience/i,
];

const PAY_SPECIFIC = [
  /\$\s*\d{2,3}(\.\d{2})?\s*[-–to]+\s*\$?\s*\d{2,3}/i,
  /\$\s*\d{2,3}(\.\d{2})?\s*\/?\s*(hr|hour|hourly)/i,
  /\d{2,3}\s*k\s*[-–to]+\s*\d{2,3}\s*k/i,
  /salary\s*(of|:)?\s*\$?\s*\d/i,
];

const OFFER_PERKS = [
  /\b(van|company\s+vehicle|take[- ]home\s+van)\b/i,
  /\b(tools?\s+(provided|supplied|allowance)|tool\s+truck)\b/i,
  /\b(overtime|ot\b|time\s+and\s+a\s+half)\b/i,
  /\b(401\s*\(?k\)?|retirement)\b/i,
  /\b(health\s+insurance|medical|dental|vision|benefits)\b/i,
  /\b(pto|paid\s+time\s+off|vacation|paid\s+holidays)\b/i,
  /\b(bonus|spiff|commission)\b/i,
  /\b(training|continuing\s+ed|natex|epa)\b/i,
  /\b(uniform|phone\s+stipend|gas\s+card)\b/i,
];

const HOOK_SIGNALS = [
  /\b(tired of|fed up|sick of|done with)\b/i,
  /\b(no more|stop\s+(chasing|working)|finally)\b/i,
  /\b(belong|family|crew|shop\s+that|team\s+that)\b/i,
  /\b(respect|treated like|backed by|supported)\b/i,
  /\b(we('re| are) looking for|join (our|a))\b/i,
  /\?/,
];

const TITLE_SIGNALS = [
  /\bhvac\b/i,
  /\b(service|install|installation|maintenance|commercial|residential|tech(nician)?|apprentice|helper|lead)\b/i,
];

const ROLE_REALISM = [
  /\b(day[- ]to[- ]day|typical\s+day|you('ll| will)\s+(diagnose|repair|install|service|troubleshoot))\b/i,
  /\b(residential|commercial|call[- ]backs|dispatch|truck|customer\s+homes)\b/i,
  /\b(furnace|ac\b|heat\s+pump|rtu|mini[- ]split|duct)\b/i,
];

const ATTITUDE_FIRST = [
  /\b(attitude|reliable|show\s+up|accountable|hungry\s+to\s+learn|work\s+ethic|honest|coachable)\b/i,
  /\b(we('ll| will)\s+train|experience\s+(preferred|helpful|a\s+plus)|not\s+required)\b/i,
];

const HEAVY_REQUIREMENTS = [
  /\b(must\s+have|required:|requirements:|minimum\s+\d+\s+years)\b/i,
  /\b(5\+|10\+|natex\s+certified|universal\s+epa|driver'?s\s+license)\b/i,
];

const CTA_SIGNALS = [
  /\b(apply|text|call|email|send\s+(your|a)\s+resume|click|book)\b/i,
  /(https?:\/\/|@|\(\d{3}\)|\d{3}[-.\s]\d{3}[-.\s]\d{4})/i,
];

function firstLines(text: string, n = 3): string {
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, n)
    .join("\n");
}

function extractQuote(text: string, pattern: RegExp, fallback = ""): string {
  const m = text.match(pattern);
  if (!m) return fallback;
  const idx = text.indexOf(m[0]);
  const start = Math.max(0, idx - 20);
  const end = Math.min(text.length, idx + m[0].length + 40);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function scoreDimensions(ad: string): GradeReport["dimensions"] {
  const lines = ad.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const top = firstLines(ad, 5);
  const topHalf = ad.slice(0, Math.floor(ad.length / 2));
  const bulletCount = (ad.match(/^[ \t]*([-*\u2022]|\d+\.)/gm) || []).length;
  const jargonHits = countMatches(ad, CORPORATE_JARGON);
  const payHits = countMatches(ad, PAY_SPECIFIC);
  const perkHits = countMatches(ad, OFFER_PERKS);
  const hookHits = countMatches(top, HOOK_SIGNALS);
  const titleHits = countMatches(lines[0] || top, TITLE_SIGNALS);
  const realismHits = countMatches(ad, ROLE_REALISM);
  const attitudeHits = countMatches(ad, ATTITUDE_FIRST);
  const heavyReq = countMatches(ad, HEAVY_REQUIREMENTS);
  const ctaHits = countMatches(ad, CTA_SIGNALS);
  const payInTop = hasAny(topHalf, PAY_SPECIFIC) || hasAny(topHalf, OFFER_PERKS);

  const titleClarity = clamp(
    3 +
      titleHits * 2 +
      (/\bhvac\b/i.test(lines[0] || "") ? 2 : 0) +
      (/(rock\s*star|ninja|guru|superstar)/i.test(lines[0] || "") ? -4 : 0) +
      ((lines[0] || "").length > 8 && (lines[0] || "").length < 80 ? 1 : 0)
  );

  const openingHook = clamp(
    2 +
      hookHits * 1.5 +
      (jargonHits > 0 ? -2 : 1) +
      (!hasAny(top, [/we\s+are\s+seeking/i, /looking\s+for\s+a\s+qualified/i])
        ? 1
        : -2) +
      (top.length > 40 ? 1 : 0)
  );

  const offerSpecificity = clamp(
    1 +
      payHits * 3 +
      perkHits * 0.8 +
      (payInTop ? 2 : -1) +
      (hasAny(ad, [/competitive\s+(pay|salary)/i]) && payHits === 0 ? -3 : 0)
  );

  const structureScannability = clamp(
    3 +
      (bulletCount >= 3 ? 3 : bulletCount) +
      (payInTop ? 2 : -1) +
      (lines.length >= 6 ? 1 : 0) +
      (ad.length > 2000 ? -1 : 0)
  );

  const roleRealism = clamp(
    3 +
      realismHits * 1.5 +
      (hasAny(ad, [/responsibilities include/i]) && realismHits < 2 ? -2 : 0) +
      (ad.length > 120 ? 1 : 0)
  );

  const candidateFilter = clamp(
    4 +
      attitudeHits * 1.5 -
      Math.max(0, heavyReq - 2) * 1.5 +
      (hasAny(ad, [/preferred|a\s+plus|we'll\s+train|will\s+train/i]) ? 2 : 0)
  );

  const ctaFriction = clamp(
    2 +
      ctaHits * 2 +
      (hasAny(ad, [/what\s+happens\s+next|next\s+steps|we('ll| will)\s+(call|text|reach)/i])
        ? 2
        : 0) +
      (ctaHits === 0 ? -2 : 0)
  );

  const aPlayerAppeal = clamp(
    (titleClarity + openingHook + offerSpecificity) / 3 +
      (jargonHits === 0 ? 1 : -1) +
      (payHits > 0 && hookHits > 0 ? 1.5 : 0)
  );

  const notes: Record<DimensionKey, string> = {
    titleClarity:
      titleClarity >= 7
        ? "Title reads like something a tech would search for — trade + role type are clear."
        : "Title is vague or cute. Use searchable trade language (e.g. HVAC Service Technician — Residential).",
    openingHook:
      openingHook >= 7
        ? "Opening speaks to a real tech — belonging or frustration, not HR filler."
        : "Hook is corporate or generic. Lead with why an employed tech would care.",
    offerSpecificity:
      offerSpecificity >= 7
        ? "Pay and perks are specific and early — that's what converts A-players."
        : '"Competitive pay" and buried benefits lose employed techs. Put a range and van/tools up top.',
    structureScannability:
      structureScannability >= 7
        ? "Scannable structure with offer high and short bullets."
        : "Wall of text or wrong order. Benefits first, short bullets, clear sections.",
    roleRealism:
      roleRealism >= 7
        ? "Gives a real picture of the day — equipment, customers, truck life."
        : "Role reads like legalese. Paint a typical day in plain English.",
    candidateFilter:
      candidateFilter >= 7
        ? "Attitude-first with lean must-haves — near-fits can still apply."
        : "Requirements list is heavy or credentials-first. Lead with attitude; keep must-haves short.",
    ctaFriction:
      ctaFriction >= 7
        ? "Clear apply path — one door, low friction."
        : "No clear CTA or too many steps. One path: text, call, or apply link.",
    aPlayerAppeal:
      aPlayerAppeal >= 7
        ? "An employed good tech might stop scrolling."
        : "Wouldn't stop an A-player mid-scroll. Specifics + belonging beat templates.",
  };

  const dim = {} as GradeReport["dimensions"];
  const scores: Record<DimensionKey, number> = {
    titleClarity,
    openingHook,
    offerSpecificity,
    structureScannability,
    roleRealism,
    candidateFilter,
    ctaFriction,
    aPlayerAppeal,
  };
  for (const key of DIMENSION_KEYS) {
    dim[key] = { score: Math.round(scores[key] * 10) / 10, note: notes[key] };
  }
  return dim;
}

function buildFixes(ad: string, dimensions: GradeReport["dimensions"]): GradeReport["topFixes"] {
  const ranked = DIMENSION_KEYS.map((key) => ({
    key,
    score: dimensions[key].score,
  })).sort((a, b) => a.score - b.score);

  const fixMap: Record<DimensionKey, (ad: string) => { title: string; quote: string; fix: string }> = {
    titleClarity: (t) => ({
      title: "Rewrite the title for search",
      quote: extractQuote(t, /^.+$/m, t.slice(0, 60)),
      fix: 'Use "HVAC Service Technician — Residential" (or Install/Commercial). Drop rock-star language.',
    }),
    openingHook: (t) => ({
      title: "Replace the corporate hook",
      quote: extractQuote(t, /we\s+are\s+(seeking|looking)|looking\s+for\s+a\s+qualified|join\s+our\s+team/i, firstLines(t, 1)),
      fix: "Open with employed-tech frustration or belonging — e.g. tired of call-backs and no backup? We run the board so you don't.",
    }),
    offerSpecificity: (t) => ({
      title: "Put a real pay range up top",
      quote: extractQuote(t, /competitive\s+(pay|salary|compensation)|doe\b|depending\s+on\s+experience/i, "competitive pay"),
      fix: "Lead with something like $28–$42/hr + OT, take-home van, tools provided. Specifics convert.",
    }),
    structureScannability: () => ({
      title: "Reorder: offer before requirements",
      quote: "",
      fix: "Title → Hook → Company → Offer bullets → Role → Who we're looking for (attitude then creds) → CTA.",
    }),
    roleRealism: () => ({
      title: "Describe a real day on the truck",
      quote: extractQuote(ad, /responsibilities include|duties include/i, ""),
      fix: "Swap legalese for: diagnose residential systems, own your callbacks, text dispatch when you need a second opinion.",
    }),
    candidateFilter: () => ({
      title: "Lead with attitude, lean the must-haves",
      quote: extractQuote(ad, /must\s+have|requirements:/i, ""),
      fix: "Open Who we're looking for with reliability/coachability. Mark EPA/NATE as preferred when you can train.",
    }),
    ctaFriction: () => ({
      title: "One clear apply path",
      quote: "",
      fix: "End with one door: Text Mike at (xxx) xxx-xxxx with your name and years on the tools. Tell them what happens next.",
    }),
    aPlayerAppeal: () => ({
      title: "Make an employed tech stop scrolling",
      quote: "",
      fix: "Combine a human hook + specific offer + respect for craft. Templates don't pull A-players.",
    }),
  };

  return ranked.slice(0, 5).map((item, i) => {
    const built = fixMap[item.key](ad);
    return { rank: i + 1, ...built };
  });
}

export function heuristicGrade(input: GradeRequest): GradeReport {
  const ad = input.adText.trim();
  const dimensions = scoreDimensions(ad);
  const overall = weightedOverall(dimensions);
  const letter = letterFromScore(overall);

  const weak = DIMENSION_KEYS.map((k) => ({
    k,
    score: dimensions[k].score,
    note: dimensions[k].note,
  }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const topIssues = weak.map((w) => w.note);

  const verdicts: Record<string, string> = {
    A: "This ad could pull employed A-players — polish the weak spots and you're ready to run it.",
    B: "Solid bones, but employed techs will bounce on the soft spots. Fix the top issues before you post.",
    C: "Average shop ad — it attracts browsers, not keepers. The offer and hook need real teeth.",
    D: "This reads like an HR template. A-players will scroll past; ghosts will apply.",
    F: "This ad attracts the ones who ghost. Rebuild hook, offer, and CTA before you spend another dollar on ads.",
  };

  const city = input.city || "your metro";
  const role =
    input.roleType && input.roleType !== "Other"
      ? input.roleType.toLowerCase()
      : "service";
  const company = input.company || "our team";

  const rewritePreview = {
    hook: `Tired of chasing call-backs with no backup and a dispatch board that never sleeps? At ${company} in ${city}, ${role} techs own their trucks, get real help on hard jobs, and go home knowing the shop has their back — not another lecture about metrics.`,
    offerBullets: [
      "$28–$42/hr based on experience + OT that actually pays",
      "Take-home van, gas card, and tools provided (or tool allowance)",
      "Medical, dental, vision + 401(k) with match",
      "Paid training / NATE support — we invest in techs who stay",
      "One clear path: text or apply — we respond within one business day",
    ],
  };

  return {
    overall,
    letter,
    verdict: verdicts[letter],
    dimensions,
    topIssues,
    topFixes: buildFixes(ad, dimensions),
    rewritePreview,
    mode: "heuristic",
  };
}
