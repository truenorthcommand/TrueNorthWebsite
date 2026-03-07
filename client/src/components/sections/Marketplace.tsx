import { useState } from "react";
import { ShoppingCart, ArrowRight, Sparkles, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const MARKETPLACE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-marketplace-bg-KpJWhSZbFqH6Gthfh4MTHL.webp";

const products = [
  {
    id: "cv-studio",
    name: "CV Studio",
    tagline: "Your career, presented perfectly.",
    description:
      "AI-powered CV and cover letter builder that produces professional, ATS-optimised documents in minutes. Upload your experience, define your target role, and receive a polished, ready-to-submit CV. No templates, no guesswork — just results.",
    price: "£9.99",
    period: "one-time",
    outcomes: ["ATS-optimised output", "Professional formatting", "Cover letter included", "Ready in minutes"],
    available: true,
    badge: "Available Now",
    badgeColor: "cyan",
  },
];

export default function Marketplace() {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !request) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://truenorthops.app.n8n.cloud/webhook/9f7807b5-84d0-4e94-8827-ff1536212956",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            request,
            source: "marketplace-feedback",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        toast.success("Request received — we'll be in touch.");
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitted(true);
      toast.success("Request received — we'll be in touch.");
    }
  };

  return (
    <section
      id="marketplace"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.12 0.04 240)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${MARKETPLACE_BG})`,
          opacity: 0.06,
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">02 — Marketplace</span>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Ready-to-Use Systems.{" "}
            <span className="gradient-text-cyan">Buy Today.</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Precision-engineered tools available immediately. No complex setup, no learning curve — operational from the moment you purchase.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`card-tn p-8 flex flex-col animate-on-scroll animate-on-scroll-delay-${i + 1}`}
              style={{ borderTop: "2px solid oklch(0.65 0.12 192)" }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-mono-tn text-xs px-3 py-1 rounded-full"
                  style={{
                    color: "oklch(0.75 0.14 192)",
                    background: "oklch(0.65 0.12 192 / 12%)",
                    border: "1px solid oklch(0.65 0.12 192 / 30%)",
                  }}
                >
                  {product.badge}
                </span>
                <span
                  className="font-display font-bold"
                  style={{ fontSize: "1.5rem", color: "oklch(0.75 0.14 192)" }}
                >
                  {product.price}
                  <span
                    className="font-mono-tn font-normal ml-1"
                    style={{ fontSize: "0.75rem", color: "oklch(0.55 0.03 220)" }}
                  >
                    {product.period}
                  </span>
                </span>
              </div>

              {/* Name & tagline */}
              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: "1.5rem", color: "oklch(0.92 0.01 220)" }}
              >
                {product.name}
              </h3>
              <p
                className="font-medium mb-4"
                style={{ color: "oklch(0.65 0.12 192)", fontSize: "0.95rem" }}
              >
                {product.tagline}
              </p>
              <p
                className="mb-6 leading-relaxed flex-1"
                style={{ color: "oklch(0.65 0.03 220)", fontSize: "0.9rem" }}
              >
                {product.description}
              </p>

              {/* Outcomes */}
              <div className="grid grid-cols-2 gap-2 mb-8">
                {product.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-2">
                    <CheckCircle size={13} style={{ color: "oklch(0.65 0.12 192)", flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: "oklch(0.70 0.02 220)" }}>
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buy button */}
              <button
                onClick={() => toast.info("CV Studio checkout coming soon — contact us to purchase.")}
                className="btn-primary-tn flex items-center justify-center gap-2 group w-full"
              >
                <ShoppingCart size={16} />
                Buy Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}

          {/* Coming Soon card */}
          <div
            className="card-tn p-8 flex flex-col animate-on-scroll animate-on-scroll-delay-2"
            style={{
              borderTop: "2px solid oklch(0.75 0.16 75 / 50%)",
              background: "oklch(0.14 0.04 240)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} style={{ color: "oklch(0.75 0.16 75)" }} />
              <span
                className="font-mono-tn text-xs px-3 py-1 rounded-full"
                style={{
                  color: "oklch(0.75 0.16 75)",
                  background: "oklch(0.75 0.16 75 / 10%)",
                  border: "1px solid oklch(0.75 0.16 75 / 30%)",
                }}
              >
                More Coming Soon
              </span>
            </div>

            <h3
              className="font-display font-bold mb-2"
              style={{ fontSize: "1.5rem", color: "oklch(0.92 0.01 220)" }}
            >
              Shape What We Build Next
            </h3>
            <p
              className="mb-6 leading-relaxed"
              style={{ color: "oklch(0.65 0.03 220)", fontSize: "0.9rem" }}
            >
              We're expanding the marketplace. Tell us what system, tool, or assistant would make the biggest difference to your work — and we'll build it.
            </p>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-3 py-8 rounded-lg flex-1"
                style={{ background: "oklch(0.65 0.12 192 / 8%)", border: "1px solid oklch(0.65 0.12 192 / 20%)" }}
              >
                <CheckCircle size={32} style={{ color: "oklch(0.65 0.12 192)" }} />
                <p className="font-display font-semibold" style={{ color: "oklch(0.88 0.01 220)" }}>
                  Request Received
                </p>
                <p className="text-xs text-center" style={{ color: "oklch(0.55 0.03 220)" }}>
                  We'll be in touch if we build it.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedback} className="flex flex-col gap-3 flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all"
                  style={{
                    background: "oklch(0.20 0.035 240)",
                    border: "1px solid oklch(1 0 0 / 12%)",
                    color: "oklch(0.88 0.01 220)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                />
                <textarea
                  placeholder="What would you like to see in the marketplace?"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all resize-none"
                  style={{
                    background: "oklch(0.20 0.035 240)",
                    border: "1px solid oklch(1 0 0 / 12%)",
                    color: "oklch(0.88 0.01 220)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                />
                <button
                  type="submit"
                  className="btn-amber-tn flex items-center justify-center gap-2 group mt-auto"
                >
                  <Send size={14} />
                  Submit Request
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
