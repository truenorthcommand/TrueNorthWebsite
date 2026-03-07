import { ArrowRight, Bot, Cpu, Layers, Zap, Users, GraduationCap } from "lucide-react";

const services = [
  {
    icon: Bot,
    label: "AI Assistants",
    name: "Personal & Executive Assistants",
    description:
      "Bespoke AI assistants built to your exact workflow. Calendar management, communication drafting, task prioritisation, and intelligent briefings — all configured to your individual requirements.",
    pricing: "Build: £1,500–£5,000 · Monthly: £150–£500",
    cta: "Enquire Now",
    accent: "amber",
  },
  {
    icon: Cpu,
    label: "Enterprise Systems",
    name: "Bespoke Operating Systems",
    description:
      "Full-scale operational platforms integrating ERP, CRM, AI agents, SOPs, and automated workflows. A single source of truth for your entire organisation — built to specification, operational from day one.",
    pricing: "Custom pricing on enquiry",
    cta: "Enquire Now",
    accent: "amber",
  },
  {
    icon: Layers,
    label: "Automation",
    name: "Workflow Automation",
    description:
      "Eliminate manual processes and data silos. We design and deploy intelligent automations that connect your existing tools, reduce operational drag, and free your team for high-value work.",
    pricing: "From £500 · Monthly from £100",
    cta: "Enquire Now",
    accent: "cyan",
  },
  {
    icon: Zap,
    label: "One-Off Builds",
    name: "Bespoke App Development",
    description:
      "Need a very specific solution? We build one-off applications tailored to your exact problem — from a custom quoting tool to a client-facing portal. Scoped, built, and delivered.",
    pricing: "From £250 · Fixed price",
    cta: "Enquire Now",
    accent: "cyan",
  },
  {
    icon: Users,
    label: "SMB & Solopreneur",
    name: "Business Systems for Growth",
    description:
      "Scalable operational systems for small businesses and solopreneurs. CRM setup, automated client onboarding, reporting dashboards, and AI-assisted communications — all without enterprise complexity.",
    pricing: "From £99 · Monthly from £49",
    cta: "Enquire Now",
    accent: "cyan",
  },
  {
    icon: GraduationCap,
    label: "Students & Individuals",
    name: "Personal Productivity Systems",
    description:
      "AI-powered tools for students, job seekers, and individuals. CV builders, study assistants, productivity apps, and personal organisation systems — built to help you achieve more, faster.",
    pricing: "From £10/month",
    cta: "Explore Marketplace",
    accent: "cyan",
    marketplaceLink: true,
  },
];

export default function Services() {
  const handleCta = (service: typeof services[0]) => {
    if (service.marketplaceLink) {
      const el = document.querySelector("#marketplace");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.14 0.04 240)" }}
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, oklch(0.12 0.04 240), transparent)" }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">04 — What We Can Build For You</span>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            From £10 a Month to{" "}
            <span className="gradient-text-cyan">Enterprise Scale.</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            TrueNorth builds for everyone. Whether you need a personal productivity tool or a full operational system for 40 staff — the complexity is ours, the results are yours.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const delay = (i % 3) + 1;
            return (
              <div
                key={service.name}
                className={`card-tn p-7 flex flex-col animate-on-scroll animate-on-scroll-delay-${delay}`}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: service.accent === "amber" ? "oklch(0.75 0.16 75 / 12%)" : "oklch(0.65 0.12 192 / 12%)",
                    border: `1px solid ${service.accent === "amber" ? "oklch(0.75 0.16 75 / 25%)" : "oklch(0.65 0.12 192 / 25%)"}`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: service.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)" }}
                  />
                </div>

                {/* Label */}
                <span className="section-label mb-2">{service.label}</span>

                {/* Name */}
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "1.15rem", color: "oklch(0.92 0.01 220)" }}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p
                  className="mb-5 leading-relaxed flex-1"
                  style={{ color: "oklch(0.62 0.03 220)", fontSize: "0.88rem" }}
                >
                  {service.description}
                </p>

                {/* Pricing */}
                <div
                  className="font-mono-tn text-xs px-3 py-2 rounded-md mb-5"
                  style={{
                    background: "oklch(0.20 0.035 240)",
                    color: service.accent === "amber" ? "oklch(0.75 0.16 75)" : "oklch(0.65 0.12 192)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                  }}
                >
                  {service.pricing}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleCta(service)}
                  className={`${service.accent === "amber" ? "btn-amber-tn" : "btn-outline-tn"} flex items-center gap-2 group text-sm`}
                >
                  {service.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
