import { Search, PenTool, Rocket } from "lucide-react";

const PROCESS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-process-bg-CQShvmFTyewvhQN3ynBN5J.webp";

const steps = [
  {
    number: "01",
    icon: Search,
    name: "Diagnose",
    headline: "We map your current state.",
    description:
      "We identify exactly where friction lives, where time is lost, and where the highest-leverage opportunities are. No assumptions — just a clear picture of what needs to change and why.",
    outcomes: ["Bottleneck identification", "Opportunity mapping", "Outcome definition"],
  },
  {
    number: "02",
    icon: PenTool,
    name: "Design",
    headline: "We architect your finished kitchen.",
    description:
      "We design a precise, scalable system tailored to your exact outcomes. Every component is chosen for a reason. Every integration is planned for reliability. You see the blueprint before a single line is written.",
    outcomes: ["System architecture", "Integration planning", "Outcome-aligned design"],
  },
  {
    number: "03",
    icon: Rocket,
    name: "Deploy",
    headline: "We hand over a system that just works.",
    description:
      "We implement the full solution — automations, AI agents, integrations, and interfaces — and ensure everything is operational from day one. The plumbing is our problem. The results are yours.",
    outcomes: ["Full implementation", "Day-one handover", "Ongoing support available"],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.12 0.04 240)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${PROCESS_BG})`,
          opacity: 0.06,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.12 192 / 5%) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">05 — How We Work</span>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            From Friction to Flow.{" "}
            <span className="gradient-text-cyan">Every Time.</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Our process is built around one principle: you should never have to think about the complexity. You define the outcome. We engineer the path.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px"
            style={{
              background: "linear-gradient(to right, transparent, oklch(0.65 0.12 192 / 30%), oklch(0.65 0.12 192 / 30%), transparent)",
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative animate-on-scroll animate-on-scroll-delay-${i + 1}`}
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.16 0.04 240)",
                      border: "1px solid oklch(0.65 0.12 192 / 40%)",
                      boxShadow: "0 0 20px oklch(0.65 0.12 192 / 15%)",
                    }}
                  >
                    <Icon size={22} style={{ color: "oklch(0.65 0.12 192)" }} />
                  </div>
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: "2.5rem", color: "oklch(0.65 0.12 192 / 20%)", lineHeight: 1 }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: "oklch(0.16 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                  }}
                >
                  <span className="section-label mb-2 block">{step.name}</span>
                  <h3
                    className="font-display font-bold mb-3"
                    style={{ fontSize: "1.2rem", color: "oklch(0.92 0.01 220)" }}
                  >
                    {step.headline}
                  </h3>
                  <p
                    className="mb-5 leading-relaxed"
                    style={{ color: "oklch(0.62 0.03 220)", fontSize: "0.88rem" }}
                  >
                    {step.description}
                  </p>

                  {/* Outcomes */}
                  <div className="flex flex-col gap-2">
                    {step.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "oklch(0.65 0.12 192)" }}
                        />
                        <span className="text-xs" style={{ color: "oklch(0.65 0.03 220)" }}>
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div
          className="mt-16 p-8 rounded-xl text-center animate-on-scroll"
          style={{
            background: "linear-gradient(135deg, oklch(0.65 0.12 192 / 8%), oklch(0.75 0.16 75 / 5%))",
            border: "1px solid oklch(0.65 0.12 192 / 20%)",
          }}
        >
          <p
            className="font-display font-semibold mb-2"
            style={{ fontSize: "1.2rem", color: "oklch(0.92 0.01 220)" }}
          >
            The plumbing is our problem. The finished kitchen is yours.
          </p>
          <p
            className="font-mono-tn text-xs"
            style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}
          >
            TRUENORTH OPERATIONS GROUP — PRECISION ENGINEERING FOR YOUR OUTCOMES
          </p>
        </div>
      </div>
    </section>
  );
}
