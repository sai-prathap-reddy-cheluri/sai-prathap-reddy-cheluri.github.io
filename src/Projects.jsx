import { Reveal } from "./components/UseReveal";
import ProjectThumb from "./components/ProjectThumb";

// ---------- data ----------

const projects = [
  {
    title: "Multimodal Movie Recommender",
    url: "https://github.com/sai-prathap-reddy-cheluri/multimodal-movie-recommender",
    overview: [
      "Built a hybrid recommender that fuses synopsis and poster embeddings with BM25 lexical signals. ",
      "Dense+BM25 retrieval is served from a FAISS ANN index with a lightweight re-ranker; seed-title personalization supports cold-start users. " ,
      "Achieved top-list relevance improvements with consistent latency as the catalog scales."
    ],
    more: [
      "Goal was to improve discovery of long-tail titles while keeping serving costs and P95 latency steady.",
      "Used transformer text embeddings and poster image embeddings, combined with BM25 scores; FAISS (ANN) handled fast top-K retrieval, with a simple re-ranker on the candidate set.",
      "Personalization used a small set of seed titles and watch history to steer retrieval for sparse profiles.",
      "Deliverables included reproducible notebooks, data loaders, a batch scoring CLI, and an offline eval harness aligned to product KPIs.",
      "Skills: Python, PyTorch/transformers, FAISS, retrieval & ranking, evaluation design, packaging/CLI."
    ],
    tags: ["#python", "#pytorch", "#faiss", "#recsys", "#ranking"],
    img: "/projects/hybrid-movie.jpg",
    alt: "Hybrid Movie Recommender preview",
    icon: "ai",
  },
  {
    title: "Credit Risk Prediction",
    url: "https://github.com/sai-prathap-reddy-cheluri/Home_Credit_Default_Risk",
    overview: [
      "Built a credit-risk model to separate lower- and higher-risk applicants at scale. ",
      "Time-aware cross-validation, leakage-safe encodings, and interpretable LightGBM features produced robust lift over a simple baseline. ",
      "Outputs include calibrated risk bands to support policy thresholds and review."
    ],
    more: [
      "Focused on preserving approval rate while reducing charge-offs and providing explanations suitable for underwriting.",
      "Feature views combined bureau history, applications, installments, and payment behavior; imputations and target encodings guarded against leakage.",
      "Validation used time-based splits; explainability via SHAP/feature importance and post-training calibration for thresholding.",
      "Packaged a scoring notebook and a draft batch pipeline; outlined monitoring for drift and stability across segments.",
      "Skills: Python, LightGBM, feature engineering, model validation, SHAP, calibration, ML ops hygiene."
    ],
    tags: ["#python", "#lightgbm", "#mlops", "#eda", "#explainability"],
    img: "/projects/credit-risk.jpg",
    alt: "Credit Risk project preview",
    icon: "graph",
  },
  {
    title: "AI Recipe Generator",
    url: "https://github.com/sai-prathap-reddy-cheluri/AI_Recipe_Generator_App",
    overview: [
      "Shipped a Streamlit app that turns free-text prompts into structured recipes with diet/allergen controls. " ,
      "Multi-provider fallback (OpenAI/Gemini), lightweight post-processing, and caching improved reliability and responsiveness. " ,
      "Outputs include ingredients, steps, exports, and basic nutrition."
    ],
    more: [
      "Designed prompts to emit structured fields (ingredients, steps, servings) with validation and gentle post-processing.",
      "Implemented provider fallback and deterministic temperature bands to keep responses consistent across common prompts.",
      "Added guardrails for allergens/diets, plus export flows for grocery lists and basic nutrition estimates.",
      "Front end optimized for quick iteration; caching trimmed repeat-prompt latency and reduced token usage.",
      "Skills: Python, Streamlit, LLM prompt/response design, provider orchestration, caching, UX for generated content."
    ],
    tags: ["#python", "#streamlit", "#openai", "#gemini", "#llm"],
    img: "/projects/ai-recipe.jpg",
    alt: "AI Recipe app preview",
    icon: "code",
  },
];

// Media: image if present, otherwise SVG thumb fallback
function ProjectMedia({ img, alt, icon }) {
  if (img) {
    return (
      <>
        <img
          src={img}
          alt={alt || ""}
          className="proj-img w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="proj-overlay" />
        <div className="proj-gloss" />
        <rect className="proj-sheen" />
      </>
    );
  }
  return <ProjectThumb icon={icon || "code"} />;
}

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.02a16.3 16.3 0 0 0-1.2-5.02A8.02 8.02 0 0 1 19.93 11ZM12 4a14.3 14.3 0 0 1 1.84 7H10.16A14.3 14.3 0 0 1 12 4ZM8.29 5.98A16.3 16.3 0 0 0 7.09 11H4.07a8.02 8.02 0 0 1 4.22-5.02ZM4.07 13h3.02c.25 1.74.7 3.45 1.22 5.02A8.02 8.02 0 0 1 4.07 13Zm6.09 0h3.68A14.3 14.3 0 0 1 12 20a14.3 14.3 0 0 1-1.84-7Zm4.54 5.02c.52-1.57.97-3.28 1.22-5.02h3.02a8.02 8.02 0 0 1-4.24 5.02Z"/>
    </svg>
  );
}

// ---------- component ----------
export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 pt-2 pb-10">
      {/* Header styled like INTRODUCTION → Overview */}
      <Reveal mode="drop">
        <div className="text-sm tracking-widest text-cyan-300">MY WORK</div>
      </Reveal>
      <Reveal mode="drop" delay={0.06}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mt-1">Projects</h2>
      </Reveal>
      {/* Intro blurb */}
      <blockquote className="mt-2 max-w-3xl text-slate-300/90 italic">
        A great data project isn't about code. It's about storytelling with data. The code is just the pen.
      </blockquote>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.title} className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            {/* Media */}
            <div className="group relative rounded-xl overflow-hidden aspect-[16/9]">
              <ProjectMedia img={p.img} alt={p.alt} icon={p.icon} />
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 inline-flex items-center gap-1 text-slate-200 bg-black/40 backdrop-blur px-2 py-1 rounded-lg border border-white/10 hover:bg-black/55"
                aria-label={`${p.title} on GitHub`}
                title="Open on GitHub"
              >
                <GlobeIcon />
                <span className="text-xs">GitHub</span>
              </a>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-lg font-medium text-slate-100">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {p.title}
              </a>
            </h3>

            {/* Overview bullets */}
            {p.overview?.length ? (
              <ul className="mt-2 pl-5 list-disc text-sm text-slate-300 marker:text-slate-500">
                {p.overview.map((line, i) => (
                  <li key={i} className="mb-1">{line}</li>
                ))}
              </ul>
            ) : null}

            {/* More details */}
            {p.more?.length ? (
              <details className="mt-2">
                <summary className="text-cyan-300 hover:text-cyan-200 cursor-pointer select-none">
                  More details
                </summary>
                <ul className="mt-1 pl-5 list-disc text-sm text-slate-300 marker:text-slate-500">
                  {p.more.map((line, i) => (
                    <li key={i} className="mb-1">{line}</li>
                  ))}
                </ul>
              </details>
            ) : null}

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs text-slate-300/90 bg-white/[0.02] border border-slate-800/60 rounded-md px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
