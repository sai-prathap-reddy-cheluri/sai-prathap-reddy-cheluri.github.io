import AbstractFace from "./AbstractFace";

/**
 * HeroFace – wrapper that wires AbstractFace with the right defaults
 */
export default function HeroFace() {
  return (
    <div className="relative w-[22rem] h-[22rem] mx-auto">
      {/* ambient glow */}
      <div
        className="absolute -inset-6 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 65% 35%, rgba(34,211,238,.25), transparent 60%), radial-gradient(60% 60% at 30% 70%, rgba(167,139,250,.20), transparent 60%)",
        }}
      />
      <AbstractFace
        size={352}
        dotCount={1700}
        assembleMs={1200}
        clickStepDeg={22}
        idleSpin={false}
        profileAngleDeg={38}
      />
    </div>
  );
}
