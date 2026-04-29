// Floating decorative stickers — pure SVG, no assets needed.
// Used as playful background elements across pages.

type StickerProps = { className?: string; style?: React.CSSProperties };

export function Sparkle({ className = "", style }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className = "", style }: StickerProps) {
  return (
    <svg viewBox="0 0 100 24" className={className} style={style} aria-hidden="true">
      <path
        d="M2 12 Q 14 -4, 26 12 T 50 12 T 74 12 T 98 12"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({ className = "", style }: StickerProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <path
        d="M45 -60 C 60 -40 70 -10 60 20 C 50 50 20 70 -15 65 C -50 60 -70 30 -65 -5 C -60 -40 -30 -70 0 -72 C 25 -74 30 -80 45 -60 Z"
        transform="translate(100 100)"
        fill="currentColor"
      />
    </svg>
  );
}

export function Star({ className = "", style }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 19 L6 22 L7 15 L2 10 L9 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Heart({ className = "", style }: StickerProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 21 C 12 21 4 14 4 8.5 C 4 5.5 6.5 4 9 4 C 10.5 4 12 5 12 6.5 C 12 5 13.5 4 15 4 C 17.5 4 20 5.5 20 8.5 C 20 14 12 21 12 21 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FloatingDeco() {
  // Absolutely positioned so the decorations scroll naturally with the page
  // (instead of being viewport-fixed, which makes them look frozen on scroll).
  // Sprinkled across the full document height with viewport-width units.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Top region — visible on first screen */}
      <Sparkle className="absolute top-[6%] left-[6%] w-10 h-10 text-[hsl(330_95%_58%)] float-slow" />
      <Star className="absolute top-[12%] right-[8%] w-14 h-14 text-[hsl(43_95%_58%)] float-slow" style={{ animationDelay: "-2s" } as React.CSSProperties} />
      <Squiggle className="absolute top-[28%] right-[10%] w-28 h-7 text-[hsl(230_85%_55%)] float-slow" style={{ animationDelay: "-3s" } as React.CSSProperties} />
      <Heart className="absolute top-[34%] left-[4%] w-9 h-9 text-[hsl(330_95%_58%)] float-slow" style={{ animationDelay: "-4s" } as React.CSSProperties} />

      {/* Mid region */}
      <Sparkle className="absolute top-[48%] right-[5%] w-12 h-12 text-[hsl(86_80%_55%)] float-slow" style={{ animationDelay: "-1s" } as React.CSSProperties} />
      <Star className="absolute top-[56%] left-[7%] w-10 h-10 text-[hsl(265_80%_62%)] float-slow" style={{ animationDelay: "-2.6s" } as React.CSSProperties} />
      <Squiggle className="absolute top-[64%] left-[3%] w-28 h-7 text-[hsl(265_80%_62%)] float-slow" style={{ animationDelay: "-2.4s" } as React.CSSProperties} />
      <Heart className="absolute top-[72%] right-[7%] w-9 h-9 text-[hsl(330_95%_58%)] float-slow" style={{ animationDelay: "-3.4s" } as React.CSSProperties} />

      {/* Bottom region */}
      <Sparkle className="absolute bottom-[14%] left-[8%] w-11 h-11 text-[hsl(43_95%_58%)] float-slow" style={{ animationDelay: "-1.8s" } as React.CSSProperties} />
      <Star className="absolute bottom-[6%] right-[10%] w-12 h-12 text-[hsl(330_95%_58%)] float-slow" style={{ animationDelay: "-2.2s" } as React.CSSProperties} />
      <Squiggle className="absolute bottom-[22%] right-[4%] w-28 h-7 text-[hsl(86_80%_55%)] float-slow" style={{ animationDelay: "-3.6s" } as React.CSSProperties} />
    </div>
  );
}

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 40" className={className} aria-label="Listening Circles">
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="7" fill="currentColor" />
      <text
        x="44"
        y="26"
        fontFamily="'Instrument Serif', serif"
        fontStyle="italic"
        fontSize="22"
        fill="currentColor"
      >
        listening circles
      </text>
    </svg>
  );
}
