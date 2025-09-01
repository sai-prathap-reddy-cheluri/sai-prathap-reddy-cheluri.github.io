// src/Experience.jsx
import { useState } from "react";
import { Reveal } from "./components/UseReveal";

const roles = [
  {
    key: "aws",
    side: "left",
    logo: "/logos/aws.png",
    badgeAlt: "AWS",
    logoScale: 1.12,
    logoOffsetY: 0,
    logoBg: "transparent",
    date: "Jul 2022 — Present",          // date shows on the RIGHT of spine
    companyLabel: "Amazon Web Services (AWS)",                 // <- label shown in header
    companyFull: "Amazon Web Services (AWS)",
    title: "Software Development Engineer",
    location: "Seattle, WA",
    bullets: [
      "Worked on the ingestion team that powers Amazon Kendra and Q Business implementing, operating, and scaling content pipelines (connectors, document processing, and ML-inference integration).",
      "Developed a multi-criteria ranking algorithm for Kendra, improving top-10 search accuracy and reducing manual filtering for enterprise users.",
      "Enhanced Q Business with file-upload ingestion and updated session storage, improving context coverage and answer quality.",
      "Scaled ingestion and ML inference to 3+ AWS regions; automated CDK/EC2 rollouts improved availability and reduced deployment failures.",
      "Raised ingestion reliability via adaptive throttling and fault-handling for DDB/SQS race conditions & OOMs; fewer production tickets.",
      "Developed structured table extraction for Amazon QBusiness with direct S3 retrieval, lowering query latency and enabling richer enterprise search."
    ],
  },
  {
    key: "accenture",
    side: "right",
    logo: "/logos/acc.png",
    badgeAlt: "Accenture",
    logoScale: 1.08,
    logoOffsetY: 0,
    logoBg: "#fff",                      // white so the black wordmark is visible
    date: "Mar 2017 — Dec 2020",         // date shows on the LEFT of spine
    companyLabel: "Accenture",           // <- label shown in header
    companyFull: "Accenture",
    title: "Application Development Analyst",
    location: "Bengaluru, India",
    bullets: [
      "Engineered enterprise content management solutions with OpenText (XECM, Content/Archive Server) for global clients.",
      "Built integrated content storage/retrieval with SAP; emphasized reliability across high-volume data movement.",
      "Automated system health reporting and data workflows, reducing manual operations effort and improving downstream data quality.",
      "Delivered enterprise data migration/compliance programs with cross-functional teams; ensured integration quality and data integrity."
    ],
  },
];

export default function Experience() {
  const aws = roles[0];
  const acc = roles[1];

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 pt-2 pb-12">
      <Reveal mode="drop">
        <div className="text-sm tracking-widest text-cyan-300">MY JOURNEY</div>
      </Reveal>
      <Reveal mode="drop" delay={0.06}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-1">Work Experience</h2>
      </Reveal>

      <div className="xp-wrap mt-8 space-y-10">
        <div className="xp-spine" />

        {/* Row 1 — AWS (left card, date on right) */}
        <div className="xp-grid grid items-start gap-6">
          <Reveal mode="slide-left"><TimelineCard role={aws} align="right" /></Reveal>
          <CenterNode
            logo={aws.logo} alt={aws.badgeAlt} date={aws.date} side="right"
            scale={aws.logoScale} offsetY={aws.logoOffsetY} bg={aws.logoBg}
          />
          <div />
        </div>

        {/* Row 2 — Accenture (right card, date on left) */}
        <div className="xp-grid grid items-start gap-6">
          <div />
          <CenterNode
            logo={acc.logo} alt={acc.badgeAlt} date={acc.date} side="left"
            scale={acc.logoScale} offsetY={acc.logoOffsetY} bg={acc.logoBg}
          />
          <Reveal mode="slide-right" delay={0.08}><TimelineCard role={acc} align="left" /></Reveal>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ role, align }) {
  const side =
    align === "right" ? "md:ml-auto" :
    align === "left"  ? "md:mr-auto" : "";

  return (
    <article className={`xp-card ${side} max-w-xl p-5`}>
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-slate-100 font-semibold">{role.title}</h3>
          <div className="text-slate-300">
            {role.companyLabel} {role.location ? `| ${role.location}` : ""}
          </div>
        </div>
      </header>

      <ul className="mt-3 pl-5 list-disc text-sm text-slate-300 marker:text-slate-500 space-y-1.5">
        {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </article>
  );
}

function CenterNode({ logo, alt, date, side, scale = 1, offsetY = 0, bg = "transparent" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="xp-centercell">
      <div className="xp-node">
        <div className="xp-badge" style={{ ["--xp-badge-bg"]: bg }}>
          {!imgError && logo ? (
            <img
              src={logo}
              alt={alt || ""}
              onError={() => setImgError(true)}
              style={{ transform: `scale(${scale}) translateY(${offsetY}px)` }}
            />
          ) : (
            <span className="fallback">{(alt || "").toUpperCase()}</span>
          )}
        </div>
      </div>
      <span className={`xp-date ${side === "right" ? "right" : "left"}`}>{date}</span>
    </div>
  );
}
