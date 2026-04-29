import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendEmail, escapeText } from "./_lib/email.js";

// Permissive schema — form sends extra fields (timezone, answers, note) we forward verbatim.
const SignupSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(300),
  role: z.string().max(300).nullable().optional(),
  timezone: z.string().max(200).nullable().optional(),
  archetype: z.string().max(200).nullable().optional(),
  answers: z.string().max(4000).nullable().optional(),
  landedLines: z.string().max(4000).nullable().optional(),
  note: z.string().max(4000).nullable().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = SignupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }

  const { name, email, role, timezone, archetype, answers, note } = parsed.data;

  const subject = `New circle signup — ${name}${archetype ? ` (${archetype})` : ""}`;
  const text = [
    `Name: ${escapeText(name)}`,
    `Email: ${escapeText(email)}`,
    `Role / who they are: ${escapeText(role) || "—"}`,
    `Timezone: ${escapeText(timezone) || "—"}`,
    `Archetype: ${escapeText(archetype) || "—"}`,
    "",
    "Note from them:",
    escapeText(note) || "—",
    "",
    "Quiz answers (raw):",
    escapeText(answers) || "—",
    "",
    "—",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await sendEmail({ subject, text, replyTo: email });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("signup email failed", err);
    return res.status(500).json({ error: "Email send failed" });
  }
}
