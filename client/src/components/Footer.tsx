// Site-wide copyright footer. Subtle, mono, bottom of every page.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-10 border-t border-foreground/15 mt-12"
      data-testid="footer-copyright"
    >
      <div className="max-w-3xl mx-auto px-6 py-6 text-[11px] font-mono uppercase tracking-widest text-foreground/55 leading-relaxed text-center">
        <div>
          © {year} Müge Yılmaz. All rights reserved.
        </div>
        <div className="mt-1 normal-case tracking-normal font-sans text-xs text-foreground/50">
          No part of this site — the words, the quiz, the archetypes, or the
          design — may be reproduced, distributed, or adapted without written
          permission.
        </div>
      </div>
    </footer>
  );
}
