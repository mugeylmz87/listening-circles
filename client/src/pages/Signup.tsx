import { useState } from "react";
import { Link } from "wouter";
import { ARCHETYPES } from "@/lib/quiz";
import { FloatingDeco } from "@/components/Stickers";
import { Confetti } from "@/components/Confetti";
import { Footer } from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getQuizResult } from "@/lib/quizStore";

export default function Signup() {
  const { archetype: archetypeKey, answers } = getQuizResult();
  const archetype = archetypeKey ? ARCHETYPES[archetypeKey] : null;
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [timezone, setTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "";
    }
  });
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [fire, setFire] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/signup", {
        name,
        email,
        role: role || null,
        timezone: timezone || null,
        archetype: archetypeKey ?? null,
        answers: answers ? JSON.stringify(answers) : null,
        landedLines: null,
        note: note || null,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something glitched.");
      }
      setDone(true);
      setFire(true);
    } catch (err: any) {
      toast({
        title: "Hmm, that didn't go through.",
        description: err.message ?? "Try once more?",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <FloatingDeco />
        <Confetti fire={fire} />
        <main className="relative z-10 max-w-xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="text-7xl pop-in">💌</div>
          <h1 className="mt-6 font-serif-display italic text-5xl leading-tight">
            in the circle.
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Your seat is saved. I'll email you soon with dates, format, and a couple
            of short questions so I can group people in ways that feel right.
          </p>
          {archetype && (
            <div className="mt-8 chunky-border rounded-2xl bg-[hsl(86_80%_70%)] p-6 chunky-shadow-sm rotate-[-0.6deg]">
              <p className="font-serif-display italic text-2xl">
                {archetype.mantra}
              </p>
              <p className="text-xs font-mono uppercase tracking-widest mt-2 text-foreground/60">
                from your {archetype.name.toLowerCase().replace(/^the /, '')} card
              </p>
            </div>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/whisper"
              className="press-in chunky-border rounded-full bg-card px-6 py-3 chunky-shadow-sm font-bold"
              data-testid="link-whisper-after-signup"
            >
              add a whisper too →
            </Link>
            <Link
              href="/"
              className="press-in chunky-border rounded-full bg-[hsl(330_95%_58%)] text-white px-6 py-3 chunky-shadow-sm font-bold"
              data-testid="link-home-after-signup"
            >
              back to start
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <FloatingDeco />
      <main className="relative z-10 max-w-xl mx-auto px-6 pt-10 pb-24">
        <Link
          href={archetype ? "/result" : "/"}
          className="text-xs font-mono uppercase tracking-widest underline underline-offset-4 hover:text-[hsl(330_95%_58%)]"
          data-testid="link-back-to-result"
        >
          ← {archetype ? "back to your card" : "back"}
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">
          save me a{" "}
          <span className="font-serif-display italic text-[hsl(330_95%_58%)]">
            seat
          </span>
          .
        </h1>
        <p className="mt-3 text-foreground/75">
          A few tiny details so I can group circles in ways that feel right. I'll
          reply with dates, format, and a couple of short questions.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-5">
          <Field label="your name" htmlFor="name" hint="what your friends call you">
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sam"
              className="w-full chunky-border bg-card rounded-xl px-4 py-3 outline-none focus:chunky-shadow-sm focus:bg-[hsl(86_80%_80%)]"
              data-testid="input-name"
            />
          </Field>

          <Field label="email" htmlFor="email" hint="for dates + the short follow-up">
            <input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@somewhere.com"
              className="w-full chunky-border bg-card rounded-xl px-4 py-3 outline-none focus:chunky-shadow-sm focus:bg-[hsl(86_80%_80%)]"
              data-testid="input-email"
            />
          </Field>

          <Field label="what do you do?" htmlFor="role" hint="a sentence, a title, or 'it's complicated'">
            <input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. designer, parent, founder, in-between"
              className="w-full chunky-border bg-card rounded-xl px-4 py-3 outline-none focus:chunky-shadow-sm focus:bg-[hsl(86_80%_80%)]"
              data-testid="input-role"
            />
          </Field>

          <Field label="timezone" htmlFor="tz" hint="so I can group people who can actually meet">
            <input
              id="tz"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Europe/London"
              className="w-full chunky-border bg-card rounded-xl px-4 py-3 outline-none focus:chunky-shadow-sm focus:bg-[hsl(86_80%_80%)]"
              data-testid="input-timezone"
            />
          </Field>

          <Field
            label="anything you want me to know?"
            htmlFor="note"
            hint="optional. one line, one paragraph, one feeling — your call."
          >
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="the one thing I'd love to actually talk about is…"
              className="w-full chunky-border bg-card rounded-xl px-4 py-3 outline-none focus:chunky-shadow-sm focus:bg-[hsl(86_80%_80%)] resize-none"
              data-testid="input-note"
            />
          </Field>

          {archetype && (
            <div className="chunky-border rounded-xl bg-[hsl(43_95%_58%)] text-foreground p-3 text-sm rotate-[-0.4deg]">
              you came in as{" "}
              <span className="font-serif-display italic text-lg px-1">
                {archetype.name.toLowerCase().replace(/^the /, "")}
              </span>{" "}
              — I'll bring that softly to whichever circle suits you.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="press-in chunky-border rounded-full bg-[hsl(330_95%_58%)] text-white py-4 text-lg font-bold chunky-shadow disabled:opacity-60"
            data-testid="button-submit-signup"
          >
            {submitting ? "saving your seat…" : "save my seat ✨"}
          </button>
          <p className="text-center text-xs font-mono uppercase tracking-widest text-foreground/50">
            no spam · no lists · just me · just once
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block">
        <div className="flex items-baseline justify-between">
          <span className="font-bold text-lg">{label}</span>
          {hint && (
            <span className="text-xs font-mono uppercase tracking-widest text-foreground/50">
              {hint}
            </span>
          )}
        </div>
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
