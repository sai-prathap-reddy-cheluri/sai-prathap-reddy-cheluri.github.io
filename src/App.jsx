import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoleCard from "./components/RoleCard";
import AbstractFace from "./components/AbstractFace";
import { Reveal } from "./components/UseReveal";
import LazyMount from "./components/LazyMount";
import Skills from "./components/SkillsOrbs";

const ProjectsLazy = lazy(() => import("./Projects"));
const ExperienceLazy = lazy(() => import("./Experience"));
const RESUME_URL = `${import.meta.env.BASE_URL}Sai_Prathap_Reddy_Cheluri_Resume.pdf`;

function Anchor({ id }) {
  return <div id={id} className="h-0 w-0" />;
}

function Home() {
  return (
    <div className="bg-subtle min-h-screen relative z-0" id="top">
      <main className="relative z-10">
        {/* Hero / About */}
        <section
          className="max-w-6xl mx-auto px-6 pt-16 pb-10"
          id="about"
          style={{ "--face-size": "22rem" }}
        >
          <div className="fade-scroll hero-rail">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Hi, I’m <span className="accent-text">Sai Prathap</span>
            </h1>
            <h3 className="mt-2 text-2xl fade-white">I humanize data</h3>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="relative w-[22rem] h-[22rem]">
              <div className="absolute -inset-10 rounded-full blur-3xl bg-cyan-500/8" />
              <div className="relative h-full w-full overflow-visible">
                <AbstractFace
                  size={352}
                  dotCount={1700}
                  assembleMs={1400}
                  clickStepDeg={22}
                />
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION → Overview */}
        <section className="max-w-6xl mx-auto px-6 pt-2 pb-10" id="intro">
          <Reveal mode="drop">
            <div className="text-sm tracking-widest text-cyan-300">
              INTRODUCTION
            </div>
          </Reveal>

          <Reveal mode="drop" delay={0.06}>
            <h2 className="text-2xl md:text-3xl font-semibold mt-1">Overview</h2>
          </Reveal>

          <p className="mt-4 text-slate-300 max-w-none">
            Software Development Engineer at Amazon Web Services with 3+ years of experience, transitioning into Data Scientist or AI/ML Engineer
            roles. I tailor and implement data-driven solutions to help
            breakthrough domains. My passion for maths backing ML/AI helps me
            design solutions that are just right.
          </p>

          <a
            href={RESUME_URL}
            download="Sai_Prathap_Reddy_Cheluri_Resume.pdf"
            className="mt-3 inline-block text-cyan-300 hover:text-cyan-200"
          >
            Download CV
          </a>


          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-5">
            <RoleCard title="ML/AI Engineer" icon="ml" revealIndex={0} />
            <RoleCard title="Data Scientist" icon="ds" revealIndex={1} />
            <RoleCard title="Software Development Engineer" icon="sde" revealIndex={2} />
            <RoleCard title="Application Development Analyst" icon="analyst" revealIndex={3} />
          </div>

          <Anchor id="intro-bottom" />
        </section>

        {/* Anchors so nav links work even before sections mount */}
        <Anchor id="projects-top" />
        <LazyMount rootMargin="400px" minHeight={600}>
          <Suspense fallback={null}>
            <ProjectsLazy />
          </Suspense>
        </LazyMount>

        <Anchor id="work-top" />
        <LazyMount rootMargin="400px" minHeight={700}>
          <Suspense fallback={null}>
            <ExperienceLazy />
          </Suspense>
        </LazyMount>

        {/* Skills */}
        <Skills />

        {/* Education */}
        <section id="education" className="max-w-6xl mx-auto px-6 py-10">
          <div className="text-sm tracking-widest text-cyan-300">EDUCATION</div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-1">Education</h2>

          <div className="mt-4 grid gap-4">
          {/* Master's */}
          <div className="neon-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-slate-100 font-semibold">
                  M.S., Applied Machine Intelligence
                </div>
                <div className="text-slate-400 text-sm">
                  Northeastern University, Boston
                </div>
              </div>
              <time className="text-slate-400 text-sm tabular-nums" dateTime="2022-07">
                Jul 2022
              </time>
            </div>
            <p className="mt-2 text-slate-300 text-sm">
              <span className="text-slate-200 font-medium">CGPA:</span>{" "}
              <span className="tabular-nums">3.95/4.0</span>
            </p>
          </div>

          {/* Bachelor's */}
          <div className="neon-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-slate-100 font-semibold">
                  B.E., Computer Science
                </div>
                <div className="text-slate-400 text-sm">
                  Visvesvaraya Technological University (VTU), Bangalore
                </div>
              </div>
              <time className="text-slate-400 text-sm tabular-nums" dateTime="2016-08">
                Aug 2016
              </time>
            </div>
          </div>
        </div>

        </section>


        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-10">
          <Anchor id="contact-top" />
          <h2 className="text-2xl font-semibold">Contact</h2>
          <form
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            action="mailto:saiprath.1061@gmail.com"
            method="POST"
            encType="text/plain"
          >
            <div className="flex flex-col">
              <label className="text-slate-300">Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 p-3 rounded-lg border border-slate-800 bg-black/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 p-3 rounded-lg border border-slate-800 bg-black/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-slate-300">Message</label>
              <textarea
                name="message"
                rows="4"
                className="mt-1 p-3 rounded-lg border border-slate-800 bg-black/30 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 md:col-span-2"
            >
              Send Message
            </button>
          </form>
          <Anchor id="contact-bottom" />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
