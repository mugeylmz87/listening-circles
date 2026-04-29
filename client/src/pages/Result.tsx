import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ARCHETYPES } from "@/lib/quiz";
import { FloatingDeco, Sparkle, Star } from "@/components/Stickers";
import { Confetti } from "@/components/Confetti";
import { Footer } from "@/components/Footer";
import { getQuizResult } from "@/lib/quizStore";

export default function Result() {
  const [, setLocation] = useLocation();
  const { archetype: archetypeKey } = getQuizResult();
  const [fire, setFire] = useState(false);

  useEffect(() => {
    if (!archetypeKey) {
      setLocation("/");
      return;
    }
    const t = setTimeout(() => setFire(true), 300);
    return () => clearTimeout(t);
  }, [archetypeKey, setLocation]);

  if (!archetypeKey) return null;
  const archetype = ARCHETYPES[archetypeKey];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <FloatingDeco />
      <Confetti fire={fire} />

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-24">
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/60">
            you are
          </p>
        </div>

        {/* The result card */}
        <div
          className={`mt-4 pop-in chunky-border rounded-3xl ${archetype.bg} ${archetype.fg} ${archetype.ring} p-8 sm:p-10 relative`}
        >
          <Sparkle className="absolute -top-5 -left-5 w-12 h-12 text-[hsl(43_95%_58%)] chunky-border rounded-full bg-background p-2" />
          <Star className="absolute -top-6 -right-6 w-14 h-14 text-[hsl(86_80%_55%)] chunky-border rounded-full bg-background p-2 rotate-12" />

          <div className="text-6xl" aria-hidden>
            {archetype.emoji}
          </div>
          <h1 className="mt-4 font-serif-display italic text-4xl sm:text-6xl leading-[0.95]" data-testid="text-archetype-name">
            {archetype.name}
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-semibold">
            {archetype.tagline}
          </p>
          <p className="mt-4 leading-relaxed">
            {archetype.vibe}
          </p>

          <div className="mt-6 chunky-border rounded-2xl bg-background/95 text-foreground p-4 -rotate-[0.8deg]">
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-foreground/60">
              today's mantra
            </div>
            <div className="mt-1 font-serif-display italic text-xl">
              {archetype.mantra}
            </div>
          </div>

          <p className="mt-5 text-sm opacity-90 italic">
            a.k.a. {archetype.also_known_as}.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 grid gap-4">
          <Link
            href="/signup"
            className="press-in chunky-border rounded-2xl bg-[hsl(330_95%_58%)] text-white px-6 py-5 chunky-shadow text-center"
            data-testid="button-to-signup"
          >
            <div className="text-xl font-bold">
              save me a seat in a circle →
            </div>
            <div className="text-sm opacity-90 mt-1">
              name + email. I'll send dates and a couple of short questions.
            </div>
          </Link>

          <Link
            href="/whisper"
            className="press-in chunky-border rounded-2xl bg-card px-6 py-5 chunky-shadow-sm text-center"
            data-testid="button-to-whisper"
          >
            <div className="text-xl font-bold">
              share a thought instead →
            </div>
            <div className="text-sm text-foreground/70 mt-1">
              anonymous or signed. what you share shapes the circles.
            </div>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm underline decoration-wavy underline-offset-4 text-foreground/60 hover:text-[hsl(330_95%_58%)]"
            data-testid="link-back-home"
          >
            ← back to the start
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
