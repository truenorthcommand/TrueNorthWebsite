import { ArrowRight, ExternalLink } from "lucide-react";

const PORTFOLIO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-portfolio-bg-j4jk5ypESSanDqhUBzKZP4.webp";

const projects = [
  {
    id: "truenorthos",
    label: "Enterprise Operating System",
    name: "TrueNorthOS",
    tagline: "A bespoke AI-powered operating system for multi-site enterprises.",
    description:
      "TrueNorthOS is our flagship enterprise solution — a fully custom operational platform integrating ERP, CRM, AI agents, SOPs, and automated workflows into a single source of truth. Built to specification, deployed with precision, operational from day one.",
    outcomes: ["Full operational visibility", "Automated reporting & briefings", "Scalable to any team size"],
    cta: "Enquire About TrueNorthOS",
    ctaType: "amber",
    badge: "Bespoke · Custom Pricing",
    accent: "amber",
  },
  {
    id: "kellyspa",
    label: "Personal Assistant System",
    name: "Kelly's PA",
    tagline: "An intelligent personal assistant built to bespoke requirements.",
    description:
      "Designed and built for a specific client's workflow, Kelly's PA demonstrates what a truly bespoke AI personal assistant can deliver. Calendar management, communication drafting, task prioritisation, and intelligent briefings — all configured to the individual. This is a showcase of capability, not a template.",
    outcomes: ["Built to exact specification", "Fully integrated with existing tools", "Expandable as requirements evolve"],
    cta: "Enquire About a Custom PA/EA",
    ctaType: "amber",
    badge: "Build: £1,500–£5,000 · Monthly: £150–£500",
    accent: "cyan",
  },
];

export default function Portfolio() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.14 0.04 240)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${PORTFOLIO_BG})`,
          opacity: 0.07,
        }}
      />

      {/* Top diagonal */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: "linear-gradient(to bottom, oklch(0.12 0.04 240), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">01 — What We've Built</span>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Proof of Capability.{" "}
            <span className="gradient-text-cyan">Not Just Promises.</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Every project here is a finished kitchen — delivered, operational, and generating results from day one. These are not concepts or demos. They are working systems built to exact specifications.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid gap-8 md:gap-10">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`card-tn p-8 md:p-10 animate-on-scroll animate-on-scroll-delay-${i + 1}`}
              style={{
                borderLeft: `3px solid ${project.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)"}`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  {/* Label + badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="section-label">{project.label}</span>
                    <span
                      className="font-mono-tn text-xs px-3 py-1 rounded-full border"
                      style={{
                        color: project.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)",
                        borderColor: project.accent === "amber" ? "oklch(0.75 0.16 75 / 30%)" : "oklch(0.65 0.12 192 / 30%)",
                        background: project.accent === "amber" ? "oklch(0.75 0.16 75 / 8%)" : "oklch(0.65 0.12 192 / 8%)",
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-display font-bold mb-2"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "oklch(0.92 0.01 220)" }}
                  >
                    {project.name}
                  </h3>

                  {/* Tagline */}
                  <p
                    className="font-medium mb-4"
                    style={{ color: project.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)", fontSize: "1rem" }}
                  >
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p
                    className="mb-6 leading-relaxed"
                    style={{ color: "oklch(0.65 0.03 220)", fontSize: "0.95rem", maxWidth: "600px" }}
                  >
                    {project.description}
                  </p>

                  {/* Outcomes */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md"
                        style={{ background: "oklch(0.20 0.035 240)", border: "1px solid oklch(1 0 0 / 8%)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: project.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)" }}
                        />
                        <span className="text-xs font-medium" style={{ color: "oklch(0.75 0.02 220)" }}>
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={project.ctaType === "amber" ? "btn-amber-tn flex items-center gap-2 group" : "btn-outline-tn flex items-center gap-2 group"}
              >
                {project.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 animate-on-scroll">
          <p
            className="font-mono-tn text-xs text-center"
            style={{ color: "oklch(0.45 0.03 220)", letterSpacing: "0.08em" }}
          >
            ALL SYSTEMS BUILT AND DELIVERED BY TRUENORTH OPERATIONS GROUP
          </p>
        </div>
      </div>
    </section>
  );
}
