import { useEffect, useRef, useState } from "react";

const RESUME_URL = `${import.meta.env.BASE_URL}Sai_Prathap_Reddy_Cheluri_Resume.pdf`;
// Nav items: "id" is for highlighting, "target" is the DOM id to scroll to
const NAV = [
  { id: "about",    label: "About",    target: "about" },
  { id: "projects", label: "Projects", target: "projects-top" },
  { id: "work",     label: "Work",     target: "work-top" },
  { id: "skills", label: "Skills", target: "skills" },
  { id: "contact",  label: "Contact",  target: "contact-top" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const headerRef = useRef(null);

  // Smooth scroll to target section, accounting for sticky header height
  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerH = headerRef.current?.offsetHeight ?? 64;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 10);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleClick = (e, targetId) => {
    e.preventDefault();
    scrollToTarget(targetId);
  };

  // Observe targets to update "active" link
  useEffect(() => {
    const targets = NAV.map(n => document.getElementById(n.target)).filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Find most visible observed target
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          // Map target id (e.g., "work-top") back to nav id ("work")
          const match = NAV.find(n => n.target === visible.target.id);
          if (match) setActive(match.id);
        }
      },

      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.35, 0.6, 0.9] }
    );

    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);

  const linkClass = (id) =>
    `transition-colors ${active === id ? "text-white" : "text-white/80 hover:text-white"}`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 border-b border-slate-800 bg-black/30 backdrop-blur"
    >
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand (left) */}
        <a href="#about" onClick={(e)=>handleClick(e, "about")} className="font-semibold flex items-center gap-2">
          <span className="text-cyan-200/80">Sai Prathap Reddy Cheluri</span>
          <span className="text-white/80 hidden sm:inline">| Data Scientist | Machine Learning Engineer</span>
        </a>

        {/* Links (right) */}
        <div className="flex items-center gap-6">
          {NAV.map(({ id, label, target }) => (
            <a
              key={id}
              href={`#${target}`}
              onClick={(e) => handleClick(e, target)}
              className={linkClass(id)}
            >
              {label}
            </a>
          ))}

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 px-3 py-1.5 rounded-lg border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-200"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
