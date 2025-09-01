
export default function HeroVisual({ theme = "nebula" }) {
  return (
    <div className={`relative flex items-center justify-center min-h-64 hero-visual theme-${theme}`}>
      {/* soft ambient glow */}
      <div className="absolute -inset-10 rounded-full blur-3xl bg-ambient" />

      {/* orb */}
      <div className="orb">
        <div className="ring r1"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>
        <div className="ring r4"></div>
        <div className="ring r5"></div>
      </div>

      {/* particle head overlay (svg) */}
      <svg className="particle-head pointer-events-none" viewBox="0 0 240 320" width="280" height="360" aria-hidden="true">
        <defs>
          <radialGradient id="phGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="var(--ph-a)" />
            <stop offset="100%" stopColor="var(--ph-b)" />
          </radialGradient>
          <filter id="spark">
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed="3" type="fractalNoise" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.2 0"/>
          </filter>
        </defs>
        {/* rough head silhouette line (dotted stroke to feel like particles) */}
        <path
          d="M130 40c-26 8-44 29-48 58-3 20 0 30-8 43-7 12-18 15-25 23-7 8-7 16 4 19 12 4 23-3 28 6 7 13 3 30 10 39 6 8 21 13 35 13 24 0 40-10 49-29 7-14 2-26 6-43 4-16 14-25 18-40 6-22-1-47-16-63-17-18-45-26-53-26Z"
          fill="none"
          stroke="url(#phGrad)"
          strokeWidth="2"
          strokeDasharray="0.5 5"
          filter="url(#spark)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
