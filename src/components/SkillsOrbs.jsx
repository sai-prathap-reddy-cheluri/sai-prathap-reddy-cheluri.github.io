import React, { useState } from "react";

/** Use your local files in /public/logos */
const SKILLS = [
  { name: "Python",
    sources: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/python/python-original.svg",
      "https://www.vectorlogo.zone/logos/python/python-icon.svg",
    ],
  },

  { name: "AWS", sources: ["/logos/aws.svg", "/logos/aws.png"], logoScale: 1.1 },

  { name: "HuggingFace", sources: ["/logos/hf.svg", "/logos/huggingface.png"], logoScale: 1.1 },

  { name: "PyTorch",
    sources: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/pytorch/pytorch-original.svg",
      "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg",
    ],
  },
  { name: "Pandas",
    sources: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/pandas/pandas-original.svg",
      "https://www.vectorlogo.zone/logos/pandas/pandas-icon.svg",
    ],
  },

  { name: "SQL", sources: [], logoScale: 1.35, extraGapPx: 28 },

  { name: "Scikit-learn",
    sources: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/scikitlearn/scikitlearn-original.svg",
      "https://www.vectorlogo.zone/logos/scikit_learn/scikit_learn-icon.svg",
    ],
  },
  { name: "NumPy",
    sources: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/numpy/numpy-original.svg",
      "https://www.vectorlogo.zone/logos/numpy/numpy-icon.svg",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-sm tracking-widest text-cyan-300">SKILLS</div>
      <h2 className="text-2xl md:text-3xl font-semibold mt-1">Tools I use</h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 place-items-center">
        {SKILLS.map((s) => (
          <PolyLogo key={s.name} {...s} />
        ))}
      </div>
    </section>
  );
}

/* Tries URLs in order until one loads (works for local or CDN) */
function ImgChain({ sources = [], alt = "", className = "", style }) {
  const [idx, setIdx] = useState(0);
  const src = sources[idx];
  if (!src) return <span className="poly-fallback">{alt?.[0] ?? "?"}</span>;
  return (
    <img
      className={className}
      alt={alt}
      src={src}
      loading="lazy"
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
      style={style}
    />
  );
}

function PolyLogo({ name, sources, logoScale = 1, extraGapPx = 0 }) {
  const lower = name.toLowerCase();
  const isSQL = lower === "sql";

  return (
    <figure className="poly-item" aria-label={name}>
      {/* Reserve extra space under large logos so they don't hit the caption */}
      <div
        className="poly-wrap"
        style={{ "--size": "112px", "--extraGap": `${extraGapPx}px` }}
      >
        {isSQL ? (
          <DatabaseBadge
            className="poly-logo"
            style={{ transform: `scale(${logoScale})` }}
          />
        ) : (
          <ImgChain
            className="poly-logo"
            sources={sources}
            alt={name}
            style={{ transform: `scale(${logoScale})` }}
          />
        )}
      </div>
      <figcaption className="poly-label">{name}</figcaption>
    </figure>
  );
}

/* Inline SQL badge (no network) */
function DatabaseBadge({ className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-label="Database SQL">
      <defs>
        <linearGradient id="dbTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7f5ff" />
          <stop offset="100%" stopColor="#bfe5ff" />
        </linearGradient>
        <linearGradient id="dbBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87c8ff" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="34" rx="38" ry="14" fill="url(#dbTop)" />
      <rect x="22" y="34" width="76" height="54" fill="url(#dbBody)" />
      <ellipse cx="60" cy="88" rx="38" ry="14" fill="#123" opacity="0.75" />
      <text
        x="60" y="70" textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontSize="28" fontWeight="800" fill="#e2f6ff" letterSpacing="1"
      >SQL</text>
    </svg>
  );
}
