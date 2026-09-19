# Job Ad Audit — environment variables

Add these to the landing page `.env.local` / hosting env (Vercel etc.).
Do not commit secrets.

```bash
# OpenAI (optional — heuristic scorer runs without a key)
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=gpt-4o-mini

# Booking CTA — Hiring Ad Audit call (matches site Header)
NEXT_PUBLIC_BOOKING_URL=https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky

# Lead webhook (optional — falls back to .data/leads.jsonl on disk)
LEAD_WEBHOOK_URL=

# Who may iframe /embed (space-separated CSP frame-ancestors)
ALLOWED_FRAME_ANCESTORS='self' https://hiredimensions.com https://www.hiredimensions.com http://localhost:* https://localhost:*
```

## Notes

- Without `OPENAI_API_KEY`, `/api/grade` uses the local heuristic scorer (demo mode badge shown).
- `LEAD_WEBHOOK_URL` should accept JSON POST of lead payloads (see `src/lib/audit/types.ts` `LeadPayloadSchema`).
- Ensure `.data/` is writable on the host if using file fallback (or always set a webhook in production).
- `ALLOWED_FRAME_ANCESTORS` is read by `src/middleware.ts` for `/embed` only.
