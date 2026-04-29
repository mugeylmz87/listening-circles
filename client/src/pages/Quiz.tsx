import { useMemo, useState } from "react";

import { QUESTIONS, scoreQuiz } from "@/lib/quiz";
import { FloatingDeco } from "@/components/Stickers";
import { Footer } from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { setQuizResult } from "@/lib/quizStore";
import { useLocation } from "wouter";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);

  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const progress = useMemo(() => ((idx + 1) / total) * 100, [idx, total]);

  const choose = (optionIndex: number) => {
    if (picked !== null) return;
    setPicked(optionIndex);
    const nextAnswers = { ...answers, [q.id]: optionIndex };
    setAnswers(nextAnswers);

    setTimeout(() => {
      setLeaving(true);
      setTimeout(async () => {
        if (idx + 1 < total) {
          setIdx(idx + 1);
          setPicked(null);
          setLeaving(false);
        } else {
          const archetype = scoreQuiz(nextAnswers);
          // fire-and-forget log
          apiRequest("POST", "/api/quiz", {
            archetype,
            answers: JSON.stringify(nextAnswers),
          }).catch(() => {});
          setQuizResult(archetype, nextAnswers);
          setLocation("/result");
        }
      }, 260);
    }, 360);
  };

  const back = () => {
    if (idx === 0) return;
    setIdx(idx - 1);
    setPicked(answers[QUESTIONS[idx - 1].id] ?? null);
    setLeaving(false);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <FloatingDeco />

      {/* Progress */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest">
          <button
            onClick={back}
            disabled={idx === 0}
            className="underline underline-offset-4 disabled:opacity-30 hover:text-[hsl(330_95%_58%)]"
            data-testid="button-back"
          >
            ← back
          </button>
          <span data-testid="text-progress">
            {idx + 1} / {total}
          </span>
        </div>
        <div className="mt-3 h-3 chunky-border rounded-full bg-card overflow-hidden">
          <div
            className="h-full bg-[hsl(330_95%_58%)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-24">
        <div
          key={q.id}
          className={`transition-all duration-300 ${
            leaving ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[hsl(330_95%_58%)]">
            question {idx + 1}
          </div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight" data-testid="text-question">
            {q.prompt}
          </h2>
          {q.sub && (
            <p className="mt-3 font-serif-display italic text-xl text-foreground/70">
              {q.sub}
            </p>
          )}

          <div className="mt-8 grid gap-4">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isDimmed = picked !== null && picked !== i;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={picked !== null}
                  className={`press-in chunky-border rounded-2xl chunky-shadow-sm text-left p-5 flex items-start gap-4 transition-all ${
                    isPicked
                      ? "bg-[hsl(86_80%_70%)] wiggle"
                      : isDimmed
                        ? "bg-card opacity-40"
                        : "bg-card"
                  }`}
                  data-testid={`button-option-${i}`}
                >
                  {opt.emoji && (
                    <span className="text-2xl leading-none shrink-0" aria-hidden>
                      {opt.emoji}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-medium leading-snug">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs font-mono uppercase tracking-widest text-foreground/50">
            no wrong answers · you can always edit later in your head
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
