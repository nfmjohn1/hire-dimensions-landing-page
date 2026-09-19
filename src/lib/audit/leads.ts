import { promises as fs } from "fs";
import path from "path";
import { LeadPayload } from "./types";

export async function captureLead(payload: LeadPayload): Promise<void> {
  const record = {
    ...payload,
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("[leads] Webhook failed:", res.status, await res.text());
      } else {
        console.log("[leads] Webhook delivered for", record.email);
      }
      return;
    } catch (err) {
      console.error("[leads] Webhook error, falling back to file:", err);
    }
  }

  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "leads.jsonl");
  await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
  console.log("[leads] Appended to .data/leads.jsonl:", record.email, record.score);
}
