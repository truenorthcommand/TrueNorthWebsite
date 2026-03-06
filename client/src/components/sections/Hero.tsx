import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-hero-bg-F7v39m9GcU8akScz8bAnWa.webp";

const words = ["Everyone.", "Individuals.", "Tradespeople.", "Students.", "Enterprises."];

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
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.18,
        }}
      />

      {/* Canvas particle overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, oklch(0.65 0.12 192 / 6%) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, oklch(0.12 0.04 240), transparent)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 192)" }}
            />
            <span className="section-label">AI Systems & Automation</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Built for{" "}
            <span
              className="inline-block transition-all duration-400"
              style={{
                color: "oklch(0.75 0.14 192)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                minWidth: "280px",
              }}
            >
              {words[wordIndex]}
            </span>
          </h1>

          <h2
            className="font-display font-semibold mb-6"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "oklch(0.88 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Your Operations. Effortlessly Scaled.
          </h2>

          {/* Sub-headline */}
          <p
            className="mb-10 max-w-2xl leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "oklch(0.65 0.03 220)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            We engineer AI-powered systems that eliminate friction, amplify leverage, and deliver measurable outcomes — from a £10/month productivity tool to a bespoke enterprise operating system. The complexity is ours. The results are yours.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary-tn flex items-center gap-2 group"
            >
              Book a Discovery Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#marketplace");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline-tn flex items-center gap-2"
            >
              Explore Our Solutions
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            {[
              { value: "£10/mo", label: "Entry-level systems" },
              { value: "Day 1", label: "Operational from handover" },
              { value: "100%", label: "Outcome-focused delivery" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
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
