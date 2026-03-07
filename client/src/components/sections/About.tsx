import { ArrowRight, Linkedin } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.14 0.04 240)" }}
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, oklch(0.12 0.04 240), transparent)" }}
      />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="animate-on-scroll">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
              <span className="section-label">06 — About</span>
            </div>
            <h2
              className="font-display font-bold mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.92 0.01 220)",
                letterSpacing: "-0.02em",
              }}
            >
              Architects of{" "}
              <span className="gradient-text-cyan">Effortless Execution.</span>
            </h2>
            <p
              className="mb-5 leading-relaxed"
              style={{ color: "oklch(0.65 0.03 220)", fontSize: "1rem" }}
            >
              TrueNorth Operations Group was founded on a single conviction: the complexity of AI and automation should never be the client's problem. Whether you're a student who needs a CV tool or a director who needs an enterprise operating system — you should experience the finished kitchen, not the plumbing.
            </p>
            <p
              className="mb-5 leading-relaxed"
              style={{ color: "oklch(0.65 0.03 220)", fontSize: "1rem" }}
            >
              Led by Matthew Cottam, TrueNorth combines deep systems thinking with practical, outcome-driven execution. We build for measurable impact: speed, margin, capacity, and control. No fluff. No over-engineering. Just systems that work.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "oklch(0.65 0.03 220)", fontSize: "1rem" }}
            >
              We serve everyone — from individuals and tradespeople to SMBs and multi-site enterprises. The quality of thinking and execution is the same at every level. Only the scale changes.
            </p>

            <a
              href="https://www.linkedin.com/in/matthewcottam"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-tn flex items-center gap-2 group w-fit"
            >
              <Linkedin size={16} />
              Connect with Matthew Cottam
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Stats / Values */}
          <div className="animate-on-scroll animate-on-scroll-delay-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "Everyone", label: "Our client base", sub: "From students to enterprises" },
                { value: "Day 1", label: "Operational from handover", sub: "No configuration required" },
                { value: "100%", label: "Outcome-focused", sub: "Results, not activity" },
                { value: "0", label: "Unnecessary complexity", sub: "We handle the plumbing" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-xl"
                  style={{
                    background: "oklch(0.16 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                  }}
                >
                  <div
                    className="font-display font-bold mb-1"
                    style={{ fontSize: "1.75rem", color: "oklch(0.75 0.14 192)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-medium text-sm mb-1"
                    style={{ color: "oklch(0.80 0.01 220)" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="font-mono-tn text-xs"
                    style={{ color: "oklch(0.50 0.03 220)" }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* TrueNorth values */}
            <div
              className="mt-4 p-5 rounded-xl"
              style={{
                background: "oklch(0.16 0.04 240)",
                border: "1px solid oklch(0.65 0.12 192 / 20%)",
              }}
            >
              <span className="section-label mb-3 block">Core Principles</span>
              <div className="flex flex-col gap-2">
                {[
                  "Outcomes over activity",
                  "Speed over perfection",
                  "Simple, scalable architecture",
                  "Human-in-the-loop by design",
                ].map((principle) => (
                  <div key={principle} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.65 0.12 192)" }}
                    />
                    <span className="text-sm" style={{ color: "oklch(0.70 0.02 220)" }}>
                      {principle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
