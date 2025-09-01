import { useEffect, useId, useRef } from "react";
import useReveal from "./UseReveal";

function Icon({ kind, gradId }) {
  const defs = (
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
        <stop className="g1" offset="0%" />
        <stop className="g2" offset="100%" />
      </linearGradient>
    </defs>
  );

  switch (kind) {
    case "ml":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {defs}
          <g fill="none" stroke={`url(#${gradId})`} strokeWidth="2.2" strokeLinecap="round">
            <circle cx="10" cy="24" r="3" />
            <circle cx="24" cy="10" r="3" />
            <circle cx="24" cy="24" r="3" />
            <circle cx="24" cy="38" r="3" />
            <circle cx="38" cy="24" r="3" />
            <path d="M12.6 22.4 21.6 13.4M12.8 25.6 21.6 34.6M26.4 13.4 35.4 22.4M26.4 34.6 35.4 25.6" />
            <path d="M21.2 24h-6.6M33.4 24h-6.6" opacity=".7" />
          </g>
        </svg>
      );
    case "ds":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {defs}
          <g fill="none" stroke={`url(#${gradId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 34v-8M18 34V14M26 34V20M34 34V26" />
            <path d="M8 38h32" opacity=".5" />
            <path d="M10 14h10l6 6h12" opacity=".7" />
          </g>
        </svg>
      );
    case "sde":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {defs}
          <g fill="none" stroke={`url(#${gradId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 16 9 24l8 8" />
            <path d="M31 16 39 24l-8 8" />
            <rect x="6" y="8" width="36" height="28" rx="4" opacity=".6" />
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          {defs}
          <g fill="none" stroke={`url(#${gradId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="24" cy="14" rx="12" ry="6" />
            <path d="M12 14v10c0 3.3 5.4 6 12 6s12-2.7 12-6V14" />
            <path d="M12 24v10c0 3.3 5.4 6 12 6s12-2.7 12-6V24" opacity=".7" />
          </g>
        </svg>
      );
  }
}

export default function RoleCard({ title, icon = "ml", onClick, revealIndex = 0 }) {
  const cardRef = useRef(null);
  const rafRef  = useRef(0);
  const tilt    = useRef({ x: 0, y: 0 });
  const gradId  = useId().replace(/:/g, "_") + "_grad";
  const revealRef = useReveal();

   const isClickable = typeof onClick === "function";

  const MAX = 16;   // tilt strength
  const SCALE = 1.02;

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  function apply(x, y) { const el = cardRef.current; if (!el) return;
    el.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(${SCALE})`;
  }
  function reset() { const el = cardRef.current; if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  }
  function handlePointerMove(e) {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    tilt.current.x = MAX * dx;
    tilt.current.y = -MAX * dy;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => apply(tilt.current.x, tilt.current.y));
  }
  function handlePointerLeave() { cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(reset); }
  function handleKeyDown(e) { if ((e.key === "Enter" || e.key === " ") && isClickable) { e.preventDefault(); onClick?.(); } }

  const FACE_MS = 1200, DURATION = 0.6, STEP = (FACE_MS/1000 - DURATION)/3;

  return (
    <div
      ref={revealRef}
      className="reveal reveal-slide-left tilt-wrap"
      style={{ "--reveal-delay": `${Math.max(0, revealIndex * STEP)}s`, "--reveal-duration": `${DURATION}s` }}
    >
      <div
        ref={cardRef}
        {...(isClickable ? {
          role: "button",
          tabIndex: 0,
          "aria-label": title,
          onKeyDown: handleKeyDown,
          onClick
        } : {
          "aria-label": title
        })}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`tilt-card gb rounded-2xl ${isClickable ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60" : "cursor-default"}`}
        style={{ transform: "rotateX(0deg) rotateY(0deg) scale(1)" }}
      >
        {/* single glossy tile content */}
        <div className="tile-surface rounded-2xl h-48 sm:h-56 md:h-60 overflow-hidden relative grid place-items-center px-6">
          <span className="sheen" />
          <div className="relative -mt-2 grid place-items-center">
            <div className="icon-aura" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative z-10">
              <Icon kind={icon} gradId={gradId} />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 pb-4 px-4">
            <div className="text-center text-slate-100 font-medium tracking-wide drop-shadow-[0_1px_0_rgba(0,0,0,.4)]">
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
