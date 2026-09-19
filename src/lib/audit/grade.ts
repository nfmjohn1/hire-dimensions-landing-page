import OpenAI from "openai";
import {
  GradeReport,
  GradeReportSchema,
  GradeRequest,
  letterFromScore,
  weightedOverall,
} from "./types";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt";
import { heuristicGrade } from "./heuristic";

function normalizeReport(raw: unknown, mode: "ai" | "heuristic"): GradeReport {
  const parsed = GradeReportSchema.parse(raw);
  const overall = weightedOverall(parsed.dimensions);
  const letter = letterFromScore(overall);
  return {
    ...parsed,
    overall,
    letter,
    mode,
  };
}

export async function gradeJobAd(input: GradeRequest): Promise<GradeReport> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return heuristicGrade(input);
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input) },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      console.warn("[grade] Empty AI response — falling back to heuristic");
      return heuristicGrade(input);
    }

    const json = JSON.parse(content);
    return normalizeReport(json, "ai");
  } catch (err) {
    console.error("[grade] AI grading failed, using heuristic:", err);
    return heuristicGrade(input);
  }
}
