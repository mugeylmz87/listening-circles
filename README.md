# Listening Circles

A small, gamified invitation app by Müge Yılmaz. Take the 90-second AI Feelings quiz, find your archetype, sign up for a circle or send an off-the-record whisper.

Live: deployed via Vercel.

## Stack

- **Frontend:** Vite + React + TypeScript + Tailwind + shadcn/ui + wouter (hash routing)
- **Backend:** Vercel serverless functions (`/api/signup`, `/api/whisper`)
- **Email:** Resend (one email to Müge per signup, one per whisper)
- **Hosting:** Vercel

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:5173 (frontend only — API functions don't run locally without `vercel dev`).

For full local dev with serverless functions:

```bash
npx vercel dev
```

## Environment variables

Set these in Vercel project settings → Environment Variables:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Get from https://resend.com (free tier: 100 emails/day) |
| `RESEND_FROM` | No | Default `Listening Circles <onboarding@resend.dev>`. Override with a verified domain. |

The recipient email is hardcoded to `mugeylmz87@gmail.com` in `api/_lib/email.ts`.

## Deploying

Push to the `main` branch — Vercel auto-deploys.

## Copyright

© Müge Yılmaz. All rights reserved. No part of this site — the words, the quiz, the archetypes, or the design — may be reproduced, distributed, or adapted without written permission.
