// Декоративная лоза с листочками — оборачивает панель сверху
export function Vine({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id="stem" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.15 145)" />
          <stop offset="100%" stopColor="oklch(0.7 0.16 130)" />
        </linearGradient>
        <radialGradient id="leaf" cx="30%" cy="30%">
          <stop offset="0%" stopColor="oklch(0.85 0.16 140)" />
          <stop offset="100%" stopColor="oklch(0.55 0.17 145)" />
        </radialGradient>
      </defs>

      {/* основной стебель */}
      <path
        d="M -10 40 Q 60 5, 120 35 T 240 30 T 360 40 T 420 25"
        fill="none"
        stroke="url(#stem)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* усики */}
      <path d="M 80 22 q 6 -14 18 -10" fill="none" stroke="oklch(0.6 0.15 145)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 200 18 q -8 -12 -20 -8" fill="none" stroke="oklch(0.6 0.15 145)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 320 26 q 8 -14 20 -10" fill="none" stroke="oklch(0.6 0.15 145)" strokeWidth="1.4" strokeLinecap="round" />

      {/* листья */}
      {[
        { x: 50, y: 15, r: -20, s: 1 },
        { x: 110, y: 8, r: 10, s: 1.1 },
        { x: 170, y: 30, r: -35, s: 0.9 },
        { x: 230, y: 10, r: 15, s: 1 },
        { x: 290, y: 28, r: -25, s: 1.1 },
        { x: 350, y: 12, r: 25, s: 0.95 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <path d="M 0 0 Q 8 -10 18 -4 Q 12 6 0 0 Z" fill="url(#leaf)" stroke="oklch(0.45 0.14 145)" strokeWidth="0.5" />
          <path d="M 0 0 Q 9 -5 18 -4" fill="none" stroke="oklch(0.4 0.12 145)" strokeWidth="0.5" />
        </g>
      ))}

      {/* маленькие ромашки-акценты */}
      {[
        { x: 30, y: 30 },
        { x: 260, y: 22 },
      ].map((d, i) => (
        <g key={`d${i}`} transform={`translate(${d.x} ${d.y})`}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="0" cy="-4" rx="1.6" ry="3.5" fill="white" stroke="oklch(0.85 0.03 100)" strokeWidth="0.3" transform={`rotate(${a})`} />
          ))}
          <circle cx="0" cy="0" r="1.5" fill="oklch(0.82 0.17 88)" />
        </g>
      ))}
    </svg>
  );
}
