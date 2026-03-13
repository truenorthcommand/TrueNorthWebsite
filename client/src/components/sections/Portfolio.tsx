import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Kelly's PA",
    category: "AI Personal Assistant",
    description: "A fully autonomous personal assistant built for a busy executive. Manages calendar, drafts communications, and handles research — all via natural language.",
    outcomes: ["12hrs/week saved", "Zero missed tasks", "Live in 5 days"],
    accent: "#00FFFF",
    tag: "Case Study",
  },
  {
    title: "TrueNorthOS",
    category: "Operational System",
    description: "A unified operating system for a growing SME. Connects CRM, project management, and finance into a single source of truth with automated reporting.",
    outcomes: ["£800/mo admin saved", "Real-time dashboards", "Full team adoption"],
    accent: "#0ea5e9",
    tag: "Case Study",
  },
  {
    title: "CV Studio",
    category: "AI Application",
    description: "An AI-powered CV and cover letter generator tailored to job descriptions. Produces professional, ATS-optimised documents in under 60 seconds.",
    outcomes: ["3x interview rate", "60-second output", "500+ users"],
    accent: "#f59e0b",
    tag: "Product",
  },
  {
    title: "ARIA",
    category: "AI Agent",
    description: "An autonomous research and intelligence agent. Monitors industry news, competitor activity, and market signals — delivering daily briefings without manual input.",
    outcomes: ["Daily intelligence", "Zero manual effort", "Configurable scope"],
    accent: "#14b8a6",
    tag: "Product",
  },
  {
    title: "Workflow Automation Suite",
    category: "Systems Integration",
    description: "End-to-end automation across a client's sales, onboarding, and invoicing pipeline. Eliminated 8 manual handoffs and reduced processing time from 3 days to 4 hours.",
    outcomes: ["8 handoffs removed", "3 days to 4 hours", "Zero rework"],
    accent: "#8b5cf6",
    tag: "Case Study",
  },
  {
    title: "AI Content Engine",
    category: "Content Automation",
    description: "A bi-weekly content generation system that pulls from case studies and ops knowledge to produce LinkedIn posts, blog drafts, and email sequences — automatically.",
    outcomes: ["Bi-weekly output", "Brand-consistent", "Zero copywriter cost"],
    accent: "#ec4899",
    tag: "Product",
  },
];

export default function Portfolio() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">What We've Built</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>
            Operational systems built to scale
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>
            Real outcomes for real businesses. Every project is defined by measurable results, not deliverables.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.title} className={`glossy-card p-6 flex flex-col gap-4 animate-on-scroll animate-on-scroll-delay-${(i % 4) + 1}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}30`, fontFamily: "'Space Grotesk', sans-serif" }}>{project.tag}</span>
                <span className="text-xs" style={{ color: "rgba(240,244,248,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>{project.category}</span>
              </div>
              <h3 className="font-display text-xl font-bold" style={{ color: "#f0f4f8" }}>{project.title}</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(240,244,248,0.6)" }}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.outcomes.map((outcome) => (
                  <span key={outcome} className="text-xs px-2.5 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(240,244,248,0.7)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Space Grotesk', sans-serif" }}>{outcome}</span>
                ))}
              </div>
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${project.accent}50, transparent)` }} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12 animate-on-scroll">
          <p className="text-base mb-4" style={{ color: "rgba(240,244,248,0.55)" }}>Want results like these for your business?</p>
          <button onClick={() => scrollTo("#contact")} className="btn-primary">Start a Conversation <ExternalLink size={15} /></button>
        </div>
      </div>
    </section>
  );
}
