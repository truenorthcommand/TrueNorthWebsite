import { ArrowRight, Bot, Cpu, Layers, Zap, Users } from "lucide-react";

const services = [
  {
    icon: Zap,
    label: "Tier 1 — Ops Starter",
    name: "Single Workflow Automation",
    description:
      "Your first automation, live in 7 days. One workflow built, configured, and handed over — with a 30-day support window and a Loom walkthrough. The fastest way to eliminate one manual process and see what's possible.",
    pricing: "From £497 setup · From £197/mo maintenance",
    cta: "Get Started",
    accent: "cyan",
  },
  {
    icon: Layers,
    label: "Tier 2 — Systems Integration",
    name: "Multi-System Automation",
    description:
      "Connect your CRM, comms, and ops stack. We design and deploy 3–5 intelligent automations across your existing tools, with SOP documentation and a 60-day optimisation window. Stop the manual work for good.",
    pricing: "From £1,500 setup · From £750/mo retainer",
    cta: "Enquire Now",
    accent: "cyan",
  },
  {
    icon: Bot,
    label: "Tier 3 — AI Agent Deployment",
    name: "Custom AI Agents",
    description:
      "Custom AI agents that handle triage, routing, drafting, and reporting autonomously. Integrated with your existing stack, fully documented, and maintained on an ongoing retainer. Scoped per engagement.",
    pricing: "From £3,500 setup · From £1,500/mo retainer",
    cta: "Enquire Now",
    accent: "amber",
  },
  {
    icon: Cpu,
    label: "Tier 4 — Managed Ops Partner",
    name: "Fractional Ops Leadership",
    description:
      "Full operating system design, build, and handover — with ongoing management of all automations and AI agents. We own the system. You own the outcomes. Priority support and quarterly business reviews included.",
    pricing: "From £5,000 setup · From £2,500/mo retainer",
    cta: "Enquire Now",
    accent: "amber",
  },
  {
    icon: Users,
    label: "Solopreneur & SMB",
    name: "Business Systems for Growth",
    description:
      "Scalable operational systems for solopreneurs and small businesses. CRM setup, automated client onboarding, reporting dashboards, and AI-assisted communications — without enterprise complexity.",
    pricing: "From £497 · Monthly from £197",
    cta: "Enquire Now",
    accent: "cyan",
  },
  {
    icon: Bot,
    label: "Personal & Executive Assistants",
    name: "Bespoke AI Assistants",
    description:
      "Bespoke AI assistants built to your exact workflow. Calendar management, communication drafting, task prioritisation, and intelligent briefings — all configured to your individual requirements.",
    pricing: "From £1,500 setup · From £150/mo",
    cta: "Enquire Now",
    accent: "amber",
  },
];

export default function Services() {
  const handleCta = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            From First Automation to{" "}
            <span className="gradient-text-cyan">Full Operating System.</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Six engagement tiers — from a standalone automation to a fully managed AI operating system. Every tier is outcome-defined from day one.
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
                  onClick={handleCta}
                  className={`${service.accent === "amber" ? "btn-amber-tn" : "btn-outline-tn"} flex items-center gap-2 group text-sm`}
                >
                  {service.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Discovery call callout */}
        <div
          className="mt-12 p-8 rounded-2xl animate-on-scroll"
          style={{
            background: "oklch(0.17 0.05 240)",
            border: "1px solid oklch(0.75 0.16 75 / 20%)",
            boxShadow: "0 4px 32px oklch(0.75 0.16 75 / 8%)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8" style={{ background: "oklch(0.75 0.16 75)" }} />
                <span className="section-label" style={{ color: "oklch(0.75 0.16 75)" }}>Paid Discovery Call</span>
              </div>
              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: "1.35rem", color: "oklch(0.92 0.01 220)" }}
              >
                Not sure which tier is right for you?
              </h3>
              <p style={{ color: "oklch(0.65 0.03 220)", fontSize: "0.92rem", maxWidth: "520px", lineHeight: "1.6" }}>
                Book a 60-minute strategy session. We'll map your current operations, identify the highest-leverage automation opportunities, and deliver a scoped proposal within 5 working days. Credited against your first engagement if you proceed.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div
                className="font-mono-tn text-sm px-4 py-2 rounded-lg"
                style={{
                  background: "oklch(0.75 0.16 75 / 10%)",
                  color: "oklch(0.80 0.18 75)",
                  border: "1px solid oklch(0.75 0.16 75 / 25%)",
                }}
              >
                From £150 · Credited on engagement
              </div>
              <button
                onClick={handleCta}
                className="btn-amber-tn flex items-center gap-2 group"
              >
                Book a Discovery Call
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
