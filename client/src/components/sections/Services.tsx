import { ArrowRight, Zap, Link2, Bot, LayoutDashboard, Settings, Users } from "lucide-react";

const TIERS = [
  { icon: Zap, title: "Ops Starter", description: "One automation, live in 48 hours. A single workflow that removes your most painful manual process. The fastest way to see what AI can do for your business.", setup: "From £497", monthly: "From £197/mo", outcomes: ["1 automation deployed", "Live in 48hrs", "Full handover included"], accent: "#00FFFF", featured: false },
  { icon: Link2, title: "Systems Integration", description: "Connect your CRM, email, finance, and project management tools. Data flows automatically. No more manual data entry, no more missed handoffs.", setup: "From £1,500", monthly: "From £750/mo", outcomes: ["3-5 automations", "Full stack connected", "Real-time data flow"], accent: "#0ea5e9", featured: false },
  { icon: Bot, title: "AI Agent Deployment", description: "Custom AI agents that handle triage, routing, drafting, and reporting autonomously. Built to your processes, trained on your data.", setup: "From £3,500", monthly: "From £1,500/mo", outcomes: ["Custom AI agents", "Autonomous workflows", "Ongoing optimisation"], accent: "#f59e0b", featured: true },
  { icon: LayoutDashboard, title: "Operations Dashboard", description: "Real-time visibility across all functions. One source of truth for decisions. Built on your existing tools.", setup: "From £2,500", monthly: "From £1,200/mo", outcomes: ["Live dashboards", "KPI tracking", "Decision-ready data"], accent: "#14b8a6", featured: false },
  { icon: Settings, title: "ERP/CRM Build-Out", description: "Full operating system design, build, and handover with SOPs and training. The complete foundation for a scalable business.", setup: "From £5,000", monthly: "From £2,500/mo", outcomes: ["Full system design", "SOPs included", "Team training"], accent: "#8b5cf6", featured: false },
  { icon: Users, title: "Managed Ops Partner", description: "Ongoing fractional ops leadership. We own the system, you own the outcomes. For businesses that want results without the overhead of a full-time ops hire.", setup: "From £7,500", monthly: "From £3,500/mo", outcomes: ["Fractional ops lead", "Continuous improvement", "Monthly reporting"], accent: "#ec4899", featured: false },
];

export default function Services() {
  const scrollTo = (id: string) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return (
    <section id="services" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">Services</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>Six engagement tiers</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>From a standalone automation to a fully managed AI operating system. Every tier is outcome-defined from day one.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div key={tier.title} className={`glossy-card p-6 flex flex-col gap-5 animate-on-scroll animate-on-scroll-delay-${(i % 4) + 1} relative`} style={tier.featured ? { border: `1px solid ${tier.accent}40`, boxShadow: `0 0 30px ${tier.accent}15` } : {}}>
                {tier.featured && (<div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: tier.accent, color: "#060b14" }}>Most Popular</span></div>)}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${tier.accent}15`, border: `1px solid ${tier.accent}30` }}><Icon size={18} style={{ color: tier.accent }} /></div>
                  <h3 className="font-display text-lg font-bold" style={{ color: "#f0f4f8" }}>{tier.title}</h3>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(240,244,248,0.6)" }}>{tier.description}</p>
                <div className="flex flex-col gap-1">
                  <p className="text-xs" style={{ color: "rgba(240,244,248,0.4)" }}>Setup</p>
                  <p className="font-display text-xl font-bold" style={{ color: tier.accent }}>{tier.setup}</p>
                  <p className="text-sm" style={{ color: "rgba(240,244,248,0.5)" }}>{tier.monthly}</p>
                </div>
                <div className="flex flex-wrap gap-2">{tier.outcomes.map((o) => (<span key={o} className="text-xs px-2.5 py-1 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(240,244,248,0.65)", border: "1px solid rgba(255,255,255,0.08)" }}>{o}</span>))}</div>
                <button onClick={() => scrollTo("#contact")} className="btn-outline text-sm py-2.5 justify-center">Enquire Now <ArrowRight size={14} /></button>
              </div>
            );
          })}
        </div>
        <div className="glossy-card p-8 text-center max-w-2xl mx-auto animate-on-scroll" style={{ border: "1px solid rgba(0,255,255,0.15)" }}>
          <p className="section-label mb-3">Not sure where to start?</p>
          <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#f0f4f8" }}>Book a Paid Discovery Call</h3>
          <p className="text-base mb-2" style={{ color: "rgba(240,244,248,0.6)" }}>A focused 60-minute session to map your operational gaps and define the right starting point. From <strong style={{ color: "#00FFFF" }}>£150</strong> — credited in full against your first engagement.</p>
          <p className="text-sm mb-6" style={{ color: "rgba(240,244,248,0.4)" }}>No obligation. No sales pitch. Just clarity.</p>
          <button onClick={() => scrollTo("#contact")} className="btn-primary">Book a Discovery Call <ArrowRight size={15} /></button>
        </div>
      </div>
    </section>
  );
}
