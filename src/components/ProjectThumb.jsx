export default function ProjectThumb({
  icon = "code",
  rounded = 16,
}) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopOpacity="1" stopColor="#0f172a"/>
          <stop offset="100%" stopOpacity="1" stopColor="#1b1035"/>
        </linearGradient>
        <linearGradient id="border" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#22d3ee"/>
          <stop offset="50%"  stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#f0abfc"/>
        </linearGradient>
        <radialGradient id="glowC" cx="65%" cy="25%" r="40%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.45)"/>
          <stop offset="100%" stopColor="rgba(34,211,238,0)"/>
        </radialGradient>
        <radialGradient id="glowV" cx="25%" cy="85%" r="45%">
          <stop offset="0%" stopColor="rgba(167,139,250,0.45)"/>
          <stop offset="100%" stopColor="rgba(167,139,250,0)"/>
        </radialGradient>
      </defs>

      {/* base */}
      <rect x="8" y="8" width="784" height="484" rx={rounded} fill="url(#bg)"/>
      {/* soft glows */}
      <rect x="8" y="8" width="784" height="484" rx={rounded} fill="url(#glowC)"/>
      <rect x="8" y="8" width="784" height="484" rx={rounded} fill="url(#glowV)"/>
      {/* glossy top highlight */}
      <path d={`M8,8 h784 v${200} c-90,40 -180,60 -280,60 H288 C200,268 120,248 8,208 Z`}
            fill="rgba(255,255,255,0.12)"/>
      {/* sheen (animated by CSS) */}
      <rect x="-300" y="0" width="300" height="500" fill="rgba(255,255,255,0.16)"
            transform="skewX(-20)" opacity="0.0" className="proj-sheen"/>
      {/* border */}
      <rect x="10" y="10" width="780" height="480" rx={rounded-2}
            fill="none" stroke="url(#border)" strokeWidth="3"/>

      {/* center icon */}
      <g transform="translate(400,265) scale(1.1)">
        {icon === "code" && (
          <g fill="none" stroke="url(#border)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-120,-60 L-180,0 L-120,60"/>
            <path d="M120,-60 L180,0 L120,60"/>
            <path d="M-40,90 L40,90" opacity="0.6"/>
            <rect x="-210" y="-110" width="420" height="220" rx="26" opacity="0.5"/>
          </g>
        )}
        {icon === "graph" && (
          <g fill="none" stroke="url(#border)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-140,80 V-10 M-80,80 V-90 M-20,80 V-40 M40,80 V-10 M100,80 V-55" />
            <path d="M-170,110 H170" opacity="0.5"/>
            <path d="M-140,-90 h80 l40,40 h110" opacity="0.7"/>
          </g>
        )}
        {icon === "ai" && (
          <g fill="none" stroke="url(#border)" strokeWidth="10" strokeLinecap="round">
            <circle cx="-80" cy="0" r="20"/><circle cx="0" cy="-80" r="20"/>
            <circle cx="0" cy="0" r="20"/><circle cx="0" cy="80" r="20"/>
            <circle cx="80" cy="0" r="20"/>
            <path d="M-62,-14 L-18,-58 M-62,14 L-18,58 M18,-58 L62,-14 M18,58 L62,14" />
            <path d="M-60,0 h40 M20,0 h40" opacity="0.7"/>
          </g>
        )}
      </g>
    </svg>
  );
}
