import { Target, Shield, Cpu } from "lucide-react";

const VALUES = [
  { icon: Target, title: "Outcome-first", description: "Every system we build is defined by a measurable outcome before we write a single line of code. If we cannot define success, we do not start.", accent: "#00FFFF" },
  { icon: Shield, title: "Human-in-the-Loop", description: "AI amplifies human judgement — it does not replace it. Every system we build keeps the right people in control of the right decisions.", accent: "#f59e0b" },
  { icon: Cpu, title: "Simple by design", description: "The best operational system is the one your team actually uses. We build for adoption, not complexity. If it needs a manual to operate, we have failed.", accent: "#14b8a6" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <p className="section-label mb-4">About TrueNorth</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "#f0f4f8" }}>We think in systems, not tasks</h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "rgba(240,244,248,0.65)" }}>
              <p>TrueNorth Operations Group designs and implements practical AI, automation, and operational systems that reduce friction, increase leverage, and scale execution.</p>
              <p>We work with founders, operators, and scale-ups who are serious about building businesses that run on systems — not on the heroic effort of individuals.</p>
              <p>Our work spans AI agents, workflow automation, ERP/CRM build-outs, personal and executive assistants, and fully managed operational systems. Everything we build ties back to measurable outcomes: speed, margin, capacity, control, or clarity.</p>
              <p>We are based in Ashford, Kent. Registered in England and Wales. Company No. 16854356.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 animate-on-scroll">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="glossy-card p-5 flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${v.accent}15`, border: `1px solid ${v.accent}30` }}><Icon size={18} style={{ color: v.accent }} /></div>
                  <div>
                    <h3 className="font-display font-bold mb-1" style={{ color: "#f0f4f8" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,248,0.6)" }}>{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
