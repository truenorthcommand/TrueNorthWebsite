import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const ICON_BLUE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card1-blue-ops_94275f56.png";
const ICON_GOLD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card2-gold-scale_2ec15f4e.png";
const ICON_TEAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/icon-card3-teal-chaos_81fbc26a.png";

const words = ["Founders.", "Operators.", "Scale-ups.", "Solopreneurs.", "Growth."];

const heroCards = [
  {
    number: "#1",
    title: "Eliminate Operational Friction",
    subtitle: "Identify and remove the manual drag slowing your business down.",
    icon: ICON_BLUE,
    gradient: "linear-gradient(135deg, oklch(0.22 0.08 240) 0%, oklch(0.18 0.12 230) 50%, oklch(0.15 0.10 220) 100%)",
    borderColor: "oklch(0.55 0.18 230 / 60%)",
    innerGlow: "oklch(0.55 0.18 230 / 15%)",
    glowColor: "oklch(0.55 0.18 230 / 25%)",
    numberColor: "oklch(0.70 0.15 230)",
    accentLine: "oklch(0.60 0.20 230)",
  },
  {
    number: "#2",
    title: "Your Ops, Effortlessly Scalable",
    subtitle: "Systems that grow with you — not against you.",
    icon: ICON_GOLD,
    gradient: "linear-gradient(135deg, oklch(0.22 0.08 75) 0%, oklch(0.18 0.12 70) 50%, oklch(0.15 0.08 65) 100%)",
    borderColor: "oklch(0.72 0.18 75 / 60%)",
    innerGlow: "oklch(0.72 0.18 75 / 15%)",
    glowColor: "oklch(0.72 0.18 75 / 25%)",
    numberColor: "oklch(0.80 0.18 75)",
    accentLine: "oklch(0.75 0.20 75)",
  },
  {
    number: "#3",
    title: "Turn Chaos Into Scalable Outcomes",
    subtitle: "We own the complexity. You own the results.",
    icon: ICON_TEAL,
    gradient: "linear-gradient(135deg, oklch(0.20 0.08 192) 0%, oklch(0.16 0.12 185) 50%, oklch(0.14 0.10 180) 100%)",
    borderColor: "oklch(0.65 0.18 192 / 60%)",
    innerGlow: "oklch(0.65 0.18 192 / 15%)",
    glowColor: "oklch(0.65 0.18 192 / 25%)",
    numberColor: "oklch(0.72 0.16 192)",
    accentLine: "oklch(0.65 0.18 192)",
  },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rotating words animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46, 169, 166, 0.5)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(46, 169, 166, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "oklch(0.12 0.04 240)" }}
    >
      {/* Canvas particle overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Subtle radial gradient accent */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, oklch(0.65 0.12 192 / 5%) 0%, transparent 65%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, oklch(0.12 0.04 240), transparent)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-16">

        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
          <span className="section-label">AI Systems & Automation</span>
          <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
        </div>

        {/* Headline */}
        <div className="text-center mb-4">
          <h1
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Built for{" "}
            <span
              className="inline-block"
              style={{
                color: "oklch(0.75 0.14 192)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                minWidth: "260px",
              }}
            >
              {words[wordIndex]}
            </span>
          </h1>
          <p
            className="mt-4 mx-auto max-w-2xl leading-relaxed"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "oklch(0.62 0.03 220)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            We engineer AI-powered systems that eliminate friction, amplify leverage, and deliver measurable outcomes. The complexity is ours. The results are yours.
          </p>
        </div>

        {/* Three glossy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 mb-12">
          {heroCards.map((card) => (
            <div
              key={card.number}
              className="relative rounded-2xl overflow-hidden flex flex-col group"
              style={{
                background: card.gradient,
                border: `1px solid ${card.borderColor}`,
                boxShadow: `0 8px 40px ${card.glowColor}, inset 0 1px 0 oklch(1 0 0 / 12%), inset 0 0 60px ${card.innerGlow}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${card.glowColor}, inset 0 1px 0 oklch(1 0 0 / 18%), inset 0 0 80px ${card.innerGlow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${card.glowColor}, inset 0 1px 0 oklch(1 0 0 / 12%), inset 0 0 60px ${card.innerGlow}`;
              }}
            >
              {/* Glossy top sheen */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, oklch(1 0 0 / 8%), transparent)",
                }}
              />

              {/* Card number */}
              <div className="px-6 pt-6 pb-2">
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    color: card.numberColor,
                    opacity: 0.35,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {card.number}
                </span>
              </div>

              {/* Icon */}
              <div className="px-6 py-3 flex items-center justify-center">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-28 h-28 object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 4px 24px oklch(0 0 0 / 40%))" }}
                />
              </div>

              {/* Accent line */}
              <div
                className="mx-6 h-px mb-4"
                style={{ background: `linear-gradient(to right, ${card.accentLine}, transparent)` }}
              />

              {/* Text */}
              <div className="px-6 pb-7 flex flex-col gap-2">
                <h3
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                    color: "oklch(0.94 0.01 220)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.83rem",
                    color: "oklch(0.68 0.03 220)",
                    lineHeight: "1.5",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => {
              const el = document.querySelector("#audit");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary-tn flex items-center gap-2 group"
          >
            Take the Free Audit
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline-tn flex items-center gap-2"
          >
            Book a Discovery Call
          </button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "From £497", label: "Entry-level systems" },
            { value: "Day 1", label: "Operational from handover" },
            { value: "100%", label: "Outcome-focused delivery" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="font-display font-bold"
                style={{ fontSize: "1.5rem", color: "oklch(0.75 0.14 192)" }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono-tn text-xs"
                style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: "oklch(0.65 0.12 192)" }}
      >
        <span className="font-mono-tn text-xs" style={{ letterSpacing: "0.1em" }}>SCROLL</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
