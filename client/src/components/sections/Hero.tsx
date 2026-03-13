import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const ICON_BLUE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card1-blue-ops_7f542aaa.png";
const ICON_GOLD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card2-gold-scale_da39d4a2.png";
const ICON_TEAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card3-teal-chaos_db7d1026.png";

const SCROLLING_WORDS = ["Founders.", "Operators.", "Scale-ups.", "Solopreneurs.", "Growth."];

const HERO_CARDS = [
  {
    number: "#1",
    title: "Eliminate Operational Friction",
    subtitle: "Systems that remove the drag slowing your business down",
    icon: ICON_BLUE,
    cardClass: "hero-card-blue",
    numColor: "rgba(14,165,233,0.5)",
    accentColor: "#0ea5e9",
  },
  {
    number: "#2",
    title: "Your Ops, Effortlessly Scalable",
    subtitle: "Built to grow with you — not against you",
    icon: ICON_GOLD,
    cardClass: "hero-card-gold",
    numColor: "rgba(245,158,11,0.5)",
    accentColor: "#f59e0b",
  },
  {
    number: "#3",
    title: "Turn Chaos Into Scalable Outcomes",
    subtitle: "From fragmented workflows to a unified operating system",
    icon: ICON_TEAL,
    cardClass: "hero-card-teal",
    numColor: "rgba(20,184,166,0.5)",
    accentColor: "#14b8a6",
  },
];

const STATS = [
  { value: "Day 1",  label: "Operational from handover" },
  { value: "100%",   label: "Outcome-focused delivery" },
  { value: "48hrs",  label: "Typical first automation live" },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animClass, setAnimClass] = useState("word-enter");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setAnimClass("word-exit");
      timerRef.current = setTimeout(() => {
        setWordIndex((i) => (i + 1) % SCROLLING_WORDS.length);
        setAnimClass("word-enter");
      }, 350);
    };
    const interval = setInterval(cycle, 2800);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16" style={{ zIndex: 1 }}>
      <div className="container">

        {/* Tag line */}
        <div className="flex justify-center mb-6">
          <span className="section-label px-4 py-1.5 rounded-full" style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.18)" }}>
            AI Systems &amp; Automation
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: "#f0f4f8" }}>
            Built for{" "}
            <span className={`inline-block ${animClass}`} style={{ color: "#00FFFF", minWidth: "10ch" }}>
              {SCROLLING_WORDS[wordIndex]}
            </span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-display font-medium" style={{ color: "rgba(240,244,248,0.7)" }}>
            Your Operations. Effortlessly Scaled.
          </p>
        </div>

        {/* Sub-copy */}
        <p className="text-center text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(240,244,248,0.55)" }}>
          We engineer AI-powered systems that eliminate friction, amplify leverage, and deliver measurable outcomes — from a single automation to a fully managed operating system. The complexity is ours. The results are yours.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button onClick={() => scrollTo("#audit")} className="btn-primary text-base px-8 py-3.5">
            Take the Free Audit <ArrowRight size={16} />
          </button>
          <button onClick={() => scrollTo("#contact")} className="btn-outline text-base px-8 py-3.5">
            Book a Discovery Call
          </button>
        </div>

        {/* Three Glossy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {HERO_CARDS.map((card) => (
            <div key={card.number} className={`${card.cardClass} p-7 flex flex-col gap-5`}>
              <p className="font-display text-5xl font-bold" style={{ color: card.numColor }}>{card.number}</p>
              <div className="flex justify-center">
                <img src={card.icon} alt={card.title} className="w-28 h-28 object-contain" style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: "#f0f4f8" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,248,0.6)" }}>{card.subtitle}</p>
              </div>
              <div className="h-px w-full mt-auto" style={{ background: `linear-gradient(90deg, ${card.accentColor}60, transparent)` }} />
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="rounded-2xl py-6 px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {STATS.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-1">
              <p className="font-display text-3xl font-bold" style={{ color: "#00FFFF" }}>{stat.value}</p>
              <p className="text-sm" style={{ color: "rgba(240,244,248,0.5)" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-12">
          <button onClick={() => scrollTo("#portfolio")} className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity" aria-label="Scroll down">
            <span className="text-xs tracking-widest uppercase font-display" style={{ color: "#f0f4f8" }}>Scroll</span>
            <ChevronDown size={18} style={{ color: "#00FFFF" }} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
