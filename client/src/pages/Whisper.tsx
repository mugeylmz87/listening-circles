import { useState } from "react";
import { Link } from "wouter";
import { ARCHETYPES } from "@/lib/quiz";
import { FloatingDeco } from "@/components/Stickers";
import { Confetti } from "@/components/Confetti";
import { Footer } from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getQuizResult } from "@/lib/quizStore";

const PROMPTS = [
  "the thing I can't say out loud about AI is…",
  "what I actually want, underneath all the AI talk, is…",
  "what I'm afraid of, if I'm honest, is…",
  "the weird joy I've been hiding is…",
  "the question I keep avoiding is…",
  "", // no prompt — just their own words
];

export default function Whisper() {
  const { archetype: archetypeKey } = getQuizResult();
  const archetype = archetypeKey ? ARCHETYPES[archetypeKey] : undefined;
  const { toast } = useToast();

  const [message, setMessage] = useState("");
  const [signed, setSigned] = useState("");
  const [anon, setAnon] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [fire, setFire] = useState(false);
  const [promptIdx, setPromptIdx] = useState(() =>
    Math.floor(Math.random() * PROMPTS.length),
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/whisper", {
        archetype: archetypeKey ?? null,
        message,
        signedName: anon ? null : signed || null,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something glitched.");
      }
      setDone(true);
      setFire(true);
    } catch (err: any) {
      toast({
        title: "Didn't send.",
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
          <div className="text-7xl pop-in">🤫</div>
          <h1 className="mt-6 font-serif-display italic text-5xl leading-tight">
            heard.
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Thank you for trusting this with a sentence. I'll read every one.
            No reply required — unless you left your name.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="press-in chunky-border rounded-full bg-[hsl(330_95%_58%)] text-white px-6 py-3 chunky-shadow-sm font-bold"
              data-testid="link-signup-after-whisper"
            >
              also save me a seat →
            </Link>
            <Link
              href="/"
              className="press-in chunky-border rounded-full bg-card px-6 py-3 chunky-shadow-sm font-bold"
              data-testid="link-home-after-whisper"
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
          href="/"
          className="text-xs font-mono uppercase tracking-widest underline underline-offset-4 hover:text-[hsl(330_95%_58%)]"
          data-testid="link-back-home"
        >
          ← back
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">
          whisper something{" "}
          <span className="font-serif-display italic text-[hsl(330_95%_58%)]">
            honest.
          </span>
        </h1>
        <p className="mt-3 text-foreground/75">
          Off the record. Tell me what you're actually thinking about AI and
          work — a sentence, a rant, a half-formed feeling. I'll read every
          one. What you share shapes the circles.
        </p>

        {archetype && (
          <div className="mt-6 chunky-border rounded-xl bg-[hsl(86_80%_70%)] p-3 text-sm rotate-[-0.4deg]">
            coming in as{" "}
            <span className="font-serif-display italic text-lg px-1">
              {archetype.name.toLowerCase().replace(/^the /, "")}
            </span>{" "}
            {archetype.emoji}
          </div>
        )}

        <form onSubmit={submit} className="mt-8 grid gap-5">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="msg" className="font-bold text-lg">
                the whisper
              </label>
              <button
                type="button"
                onClick={() =>
                  setPromptIdx((promptIdx + 1) % PROMPTS.length)
                }
                className="text-xs font-mono uppercase tracking-widest underline underline-offset-4 hover:text-[hsl(330_95%_58%)]"
                data-testid="button-shuffle-prompt"
              >
                shuffle prompt ↻
              </button>
            </div>
            <div className="mt-2 chunky-border rounded-xl bg-card chunky-shadow-sm">
              {PROMPTS[promptIdx] ? (
                <div className="px-4 pt-3 pb-1 font-serif-display italic text-lg text-foreground/60">
                  {PROMPTS[promptIdx]}
                </div>
              ) : (
                <div className="px-4 pt-3 pb-1 font-mono uppercase tracking-widest text-[11px] text-foreground/50">
                  no prompt · your words, your way
                </div>
              )}
              <textarea
                id="msg"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                placeholder={
                  PROMPTS[promptIdx]
                    ? "…continue in your own words"
                    : "say whatever you want to say…"
                }
                className="w-full px-4 pb-4 bg-transparent outline-none resize-none"
                data-testid="input-message"
              />
            </div>
          </div>

          <div className="chunky-border rounded-xl bg-card p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={anon}
                onChange={(e) => setAnon(e.target.checked)}
                className="w-5 h-5 chunky-border accent-[hsl(330_95%_58%)]"
                data-testid="checkbox-anonymous"
              />
              <span>send anonymously (no reply possible)</span>
            </label>
            {!anon && (
              <input
                value={signed}
                onChange={(e) => setSigned(e.target.value)}
                placeholder="your name or email (so I can reply if it calls for one)"
                className="mt-3 w-full chunky-border bg-background rounded-lg px-3 py-2 outline-none"
                data-testid="input-signed"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="press-in chunky-border rounded-full bg-[hsl(230_85%_55%)] text-white py-4 text-lg font-bold chunky-shadow disabled:opacity-60"
            data-testid="button-submit-whisper"
          >
            {submitting ? "sending…" : "send whisper 🤫"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
