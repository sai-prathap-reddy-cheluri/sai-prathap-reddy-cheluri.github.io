/* @refresh reload */
import { useEffect, useRef } from "react";

export default function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rm.matches) { el.classList.add("is-visible"); return; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({ children, delay = 0, mode = "drop", className = "" }) {
  const ref = useReveal();
  const kind = mode === "slide-left" ? "reveal-slide-left" : "reveal-drop";
  return (
    <div
      ref={ref}
      className={`reveal ${kind} ${className}`}
      style={{ "--reveal-delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}
