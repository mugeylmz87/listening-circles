import { Resend } from "resend";

const RECIPIENT = "mugeylmz87@gmail.com";

// Default Resend sandbox sender (works without domain verification).
// Change to a verified domain for better deliverability later.
const FROM = process.env.RESEND_FROM || "Listening Circles <onboarding@resend.dev>";

export async function sendEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: FROM,
    to: RECIPIENT,
    subject: opts.subject,
    text: opts.text,
    replyTo: opts.replyTo,
  });
  return result;
}

export function escapeText(s: unknown): string {
  if (s == null) return "";
  return String(s);
}
