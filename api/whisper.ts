import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendEmail, escapeText } from "./_lib/email.js";

const WhisperSchema = z.object({
  message: z.string().min(1).max(4000),
  prompt: z.string().max(500).nullable().optional(),
  archetype: z.string().max(200).nullable().optional(),
  signedName: z.string().max(200).nullable().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = WhisperSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }

  const { message, prompt, archetype, signedName } = parsed.data;

  const signer = signedName ? signedName : "Anonymous";
  const subject = `New whisper from ${signer}`;
  const text = [
    `Signed: ${escapeText(signer)}`,
    `Archetype: ${escapeText(archetype) || "—"}`,
    prompt ? `Prompt: ${escapeText(prompt)}` : "Prompt: (no prompt — their own words)",
    "",
    "Message:",
    escapeText(message),
    "",
    "—",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await sendEmail({ subject, text });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("whisper email failed", err);
    return res.status(500).json({ error: "Email send failed" });
  }
}
