import { useEffect, useRef, useState } from "react";

// SVG ромашка с большими лепестками — герой сайта и логотип
function Daisy({ size = 40 }: { size?: number }) {
  const petals = 8;
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className="sway">
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-26"
          rx="12"
          ry="24"
          fill="white"
          stroke="oklch(0.85 0.03 100)"
          strokeWidth="1"
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="oklch(0.82 0.17 88)" />
      <circle cx="0" cy="0" r="10" fill="url(#g)" opacity="0.5" />
      <defs>
        <radialGradient id="g">
          <stop offset="0%" stopColor="oklch(0.9 0.15 90)" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 70)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Один падающий лепесток — вытянутый эллипс с мягкой тенью
function Petal({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="-20 -40 40 80" width={size} height={size * 2}>
      <defs>
        <radialGradient id="pet" cx="50%" cy="30%">
          <stop offset="0%" stopColor="white" />
          <stop offset="70%" stopColor="oklch(0.97 0.02 90)" />
          <stop offset="100%" stopColor="oklch(0.9 0.05 90)" />
        </radialGradient>
      </defs>
      <ellipse
        cx="0"
        cy="0"
        rx="12"
        ry="34"
        fill="url(#pet)"
        stroke="oklch(0.85 0.04 100)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

type Flake = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  swayDur: number;
  rotate: number;
  opacity: number;
};

export function AnimatedBackground() {
  const [petals, setPetals] = useState<Flake[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<{ x: number; y: number; r: number }[]>([]);

  useEffect(() => {
    const arr: Flake[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 18,
      duration: 12 + Math.random() * 16,
      size: 14 + Math.random() * 22,
      swayDur: 3 + Math.random() * 4,
      rotate: Math.random() * 360,
      opacity: 0.55 + Math.random() * 0.4,
    }));
    setPetals(arr);
    stateRef.current = arr.map(() => ({ x: 0, y: 0, r: 0 }));
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number;
      let clientY: number;
      if ("touches" in e) {
        const t = e.touches[0];
        if (!t) return;
        clientX = t.clientX;
        clientY = t.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouseRef.current = { x: clientX, y: clientY, active: true };
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    let rafId: number;
    const radius = 200;
    const strength = 70;
    const ease = 0.08; // smoothing factor — lower = smoother

    const applyWind = () => {
      const { x: mx, y: my, active } = mouseRef.current;

      petalRefs.current.forEach((el, i) => {
        if (!el) return;
        const state = stateRef.current[i];
        if (!state) return;

        let targetX = 0;
        let targetY = 0;
        let targetR = 0;

        if (active) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius && dist > 0.5) {
              const force = (1 - dist / radius) * strength;
              const inv = 1 / dist;
              targetX = dx * inv * force;
              targetY = dy * inv * force;
              targetR = (dx * inv) * force * 0.25; // stable rotation from angle
            }
          }
        }

        // ease toward target — kills the jitter
        state.x += (targetX - state.x) * ease;
        state.y += (targetY - state.y) * ease;
        state.r += (targetR - state.r) * ease;

        if (
          Math.abs(state.x) < 0.05 &&
          Math.abs(state.y) < 0.05 &&
          Math.abs(state.r) < 0.05
        ) {
          if (el.style.transform) el.style.transform = "";
        } else {
          el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0) rotate(${state.r.toFixed(2)}deg)`;
        }
      });

      rafId = requestAnimationFrame(applyWind);
    };

    rafId = requestAnimationFrame(applyWind);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [petals]);


  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-blob" />
      </div>
      <div className="grid-overlay" />
      <div className="particles">
        {petals.map((p, i) => (
          <div
            key={p.id}
            className="petal-fall"
            style={{
              left: `${p.left}%`,
              animationDelay: `-${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          >
            <div
              ref={(el) => { petalRefs.current[i] = el; }}
              className="petal-wind"
              style={{ willChange: "transform" }}
            >
              <div
                className="petal-sway"
                style={{
                  animationDuration: `${p.swayDur}s`,
                  animationDelay: `-${p.delay / 2}s`,
                }}
              >
                <div
                  className="petal-spin"
                  style={{
                    transform: `rotate(${p.rotate}deg)`,
                    animationDuration: `${p.swayDur * 2}s`,
                  }}
                >
                  <Petal size={p.size} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export { Daisy };
