const STEPS = [
  { number: "01", title: "Discovery", description: "A focused session to map your current operations, identify the highest-leverage gaps, and define the right starting point. No assumptions. No generic advice.", accent: "#00FFFF" },
  { number: "02", title: "Design", description: "We architect the solution — workflows, integrations, agents, and data flows — before writing a single line of code. You approve the design before we build.", accent: "#0ea5e9" },
  { number: "03", title: "Build", description: "Rapid, iterative delivery. Most automations are live within 48 hours. Complex systems within 2-4 weeks. You see progress at every stage.", accent: "#f59e0b" },
  { number: "04", title: "Handover", description: "Full documentation, SOPs, and training. You own everything we build. No lock-in, no dependency on us to keep the lights on.", accent: "#14b8a6" },
  { number: "05", title: "Optimise", description: "Ongoing monitoring, iteration, and improvement. Systems that get better over time, not worse. Monthly reporting on outcomes vs targets.", accent: "#8b5cf6" },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">How We Work</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>Five steps to operational clarity</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>A repeatable process that delivers results without surprises. Every engagement follows the same five steps.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.number} className={`glossy-card p-6 flex gap-6 items-start animate-on-scroll animate-on-scroll-delay-${(i % 4) + 1}`}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg" style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}30`, color: step.accent }}>{step.number}</div>
              <div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#f0f4f8" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,248,0.6)" }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
