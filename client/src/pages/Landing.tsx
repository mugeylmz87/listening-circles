import { Link } from "wouter";
import { FloatingDeco, Logo, Sparkle } from "@/components/Stickers";
import { Footer } from "@/components/Footer";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <FloatingDeco />

      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-8 flex items-center justify-between">
        <Logo className="h-8 text-foreground" />
        <Link
          href="/whisper"
          className="text-sm underline decoration-wavy underline-offset-4 hover:text-[hsl(330_95%_58%)]"
          data-testid="link-whisper-nav"
        >
          send a whisper →
        </Link>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-10 pb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 chunky-border rounded-full bg-[hsl(86_80%_70%)] chunky-shadow-sm rotate-[-1.5deg]">
          <Sparkle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.14em]">
            an invitation · not a pitch
          </span>
        </div>

        <h1 className="mt-6 text-[2.75rem] sm:text-7xl font-bold leading-[1.02] sm:leading-[0.95] tracking-tight">
          hi <span className="font-serif-display text-[hsl(330_95%_58%)]">friend</span>,
          <br />
          how's your <br className="hidden sm:inline" />
          relationship <br className="hidden sm:inline" />
          with{" "}
          <span className="relative inline-block align-baseline">
            <span
              aria-hidden="true"
              className="absolute inset-x-[-4%] top-[18%] bottom-[14%] -z-10 bg-[hsl(43_95%_58%)] -rotate-2"
            />
            <span className="relative">AI</span>
          </span>{" "}
          these days?
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-foreground/80 max-w-xl leading-relaxed">
          Mine is{" "}
          <span className="font-serif-display italic text-[hsl(330_95%_58%)]">
            a lot.
          </span>{" "}
          Deep in it. A little obsessed, a little fried. Talking to my laptop for
          hours not because I have to — because I want to.
        </p>

        <p className="mt-4 text-lg text-foreground/80 max-w-xl leading-relaxed">
          But everyone I talk to is somewhere different with this. And almost no
          one has a place to say the true thing out loud.
        </p>

        <div className="mt-10 grid gap-3 max-w-xl">
          {[
            "maybe you're in it, a little obsessed, a little fried.",
            "maybe you've been avoiding it, and the avoidance itself feels heavy.",
            "maybe you're using it but quietly feel behind.",
            "maybe you're so sick of AI in every conversation you want to scream.",
            "maybe you love it, and feel weirdly alone in that.",
            "or maybe you feel something that doesn't fit any of these — and that's exactly the point.",
          ].map((line, i) => (
            <div
              key={i}
              className="chunky-border rounded-2xl bg-card px-5 py-3 chunky-shadow-sm rotate-[-0.4deg] even:rotate-[0.6deg] text-base"
            >
              {line}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/quiz"
            className="group press-in chunky-border rounded-full bg-[hsl(330_95%_58%)] text-white px-8 py-4 text-lg font-bold chunky-shadow cursor-pointer inline-flex items-center gap-2"
            data-testid="button-start-quiz"
          >
            <span>What's your AI archetype? Find out</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <span className="text-sm text-foreground/60 font-mono">
            ~90 seconds · 7 questions · no wrong answers
          </span>
        </div>

        <div className="mt-20 chunky-border rounded-3xl bg-[hsl(86_80%_70%)] p-8 chunky-shadow rotate-[-0.6deg]">
          <h2 className="font-serif-display text-4xl italic">
            about the circles
          </h2>
          <div className="mt-4 space-y-3 text-foreground/90 leading-relaxed">
            <p>
              I'm opening a few small listening circles for anyone who wants
              one.
            </p>
            <p>
              Not a class. Not a debate. No one trying to convince you to be more
              pro or more anti. Just real conversation, deep listening, and a
              space where you don't need a hot take or a polished strategy.
            </p>
            <p className="font-semibold">You'll leave with:</p>
            <ul className="list-none space-y-2 pl-0">
              {[
                "a safe, off-the-record space",
                "stories swapped, notes compared, the absurd bits laughed about",
                "a little more grounded in what you actually want with AI",
                "a few new 'people you can text' when the next wild thing drops",
                "and, ideally, a little lighter than you came in",
              ].map((x, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[hsl(330_95%_58%)] chunky-border" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 chunky-border rounded-3xl bg-card p-8 chunky-shadow rotate-[0.5deg]">
          <h3 className="font-serif-display text-3xl italic">
            a bit about why I'm doing this
          </h3>
          <p className="mt-3 text-foreground/85 leading-relaxed">
            I'm a co-active, ICF-certified coach with hundreds of hours under my
            belt. By day I'm in product and AI conversations. By night I hear the
            quieter side in 1:1 sessions — the anxiety, the grief, the weird joy,
            the <span className="font-serif-display italic">
              "am I still good at my job?"
            </span>{" "}
            that doesn't fit in a team meeting.
          </p>
          <p className="mt-3 font-serif-display text-2xl italic text-[hsl(330_95%_58%)]">
            I don't think we're meant to process this alone.
          </p>
          <p className="mt-3 text-right text-foreground/70">
            — warmly, Müge
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/quiz"
            className="press-in inline-block chunky-border rounded-full bg-[hsl(230_85%_55%)] text-white px-10 py-5 text-xl font-bold chunky-shadow-lg cursor-pointer"
            data-testid="button-start-quiz-bottom"
          >
            okay, I'll take the quiz ✨
          </Link>
          <div className="mt-4">
            <Link
              href="/whisper"
              className="text-sm text-foreground/60 underline decoration-wavy underline-offset-4 hover:text-[hsl(330_95%_58%)]"
              data-testid="link-skip-to-whisper"
            >
              or skip the quiz and just share a thought →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
