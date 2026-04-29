import { useEffect, useState } from "react";

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
  shape: "square" | "circle" | "triangle";
};

const COLORS = [
  "hsl(330, 95%, 58%)",
  "hsl(230, 85%, 55%)",
  "hsl(86, 80%, 55%)",
  "hsl(43, 95%, 58%)",
  "hsl(265, 80%, 62%)",
];

export function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!fire) return;
    const next: Piece[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i + Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.6 + Math.random() * 1.4,
      color: COLORS[i % COLORS.length],
      size: 8 + Math.random() * 10,
      rotate: Math.random() * 360,
      shape: (["square", "circle", "triangle"] as const)[i % 3],
    }));
    setPieces(next);
    const t = setTimeout(() => setPieces([]), 3200);
    return () => clearTimeout(t);
  }, [fire]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute confetti"
          style={{
            left: `${p.left}%`,
            top: "-10vh",
            width: p.size,
            height: p.size,
            background: p.shape === "triangle" ? "transparent" : p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            transform: `rotate(${p.rotate}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ...(p.shape === "triangle" && {
              width: 0,
              height: 0,
              background: "transparent",
              borderLeft: `${p.size / 2}px solid transparent`,
              borderRight: `${p.size / 2}px solid transparent`,
              borderBottom: `${p.size}px solid ${p.color}`,
            }),
          }}
        />
      ))}
    </div>
  );
}
