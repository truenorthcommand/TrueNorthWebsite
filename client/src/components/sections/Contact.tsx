import { useState } from "react";
import { ArrowRight, Send, CheckCircle, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", service: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message received — we'll be in touch shortly.");
  };

  const services = [
    "Book a Discovery Call",
    "Custom PA / EA System",
    "Enterprise Operating System",
    "Workflow Automation",
    "Bespoke App Development",
    "Business Systems",
    "Other",
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.12 0.04 240)" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.65 0.12 192 / 6%) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">07 — Get In Touch</span>
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            Ready for Your Operations{" "}
            <span className="gradient-text-cyan">to Just Work?</span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Tell us what you need. We'll tell you exactly how we can deliver it — and what it will cost.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <div className="md:col-span-2 animate-on-scroll">
            <div className="flex flex-col gap-6">
              <div>
                <h3
                  className="font-display font-semibold mb-4"
                  style={{ fontSize: "1.2rem", color: "oklch(0.88 0.01 220)" }}
                >
                  TrueNorth Operations Group
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <Mail size={16} style={{ color: "oklch(0.65 0.12 192)", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: "oklch(0.80 0.01 220)" }}>
                        Email
                      </div>
                      <a
                        href="mailto:hello@truenorthoperationsgroup.com"
                        className="text-sm transition-colors"
                        style={{ color: "oklch(0.65 0.03 220)" }}
                      >
                        hello@truenorthoperationsgroup.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} style={{ color: "oklch(0.65 0.12 192)", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: "oklch(0.80 0.01 220)" }}>
                        Location
                      </div>
                      <div className="text-sm" style={{ color: "oklch(0.65 0.03 220)" }}>
                        Ashford, Kent, UK
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "oklch(0.16 0.04 240)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                <span className="section-label mb-3 block">Quick Actions</span>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Book a Discovery Call", href: "#contact" },
                    { label: "Explore the Marketplace", href: "#marketplace" },
                    { label: "View Our Portfolio", href: "#portfolio" },
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 text-sm text-left group transition-colors py-1"
                      style={{ color: "oklch(0.65 0.03 220)" }}
                    >
                      <ArrowRight
                        size={12}
                        style={{ color: "oklch(0.65 0.12 192)", flexShrink: 0 }}
                        className="transition-transform group-hover:translate-x-1"
                      />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 animate-on-scroll animate-on-scroll-delay-2">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl h-full"
                style={{
                  background: "oklch(0.16 0.04 240)",
                  border: "1px solid oklch(0.65 0.12 192 / 30%)",
                }}
              >
                <CheckCircle size={48} style={{ color: "oklch(0.65 0.12 192)" }} />
                <h3
                  className="font-display font-bold text-center"
                  style={{ fontSize: "1.5rem", color: "oklch(0.92 0.01 220)" }}
                >
                  Message Received
                </h3>
                <p className="text-center" style={{ color: "oklch(0.65 0.03 220)", fontSize: "0.95rem" }}>
                  We'll review your enquiry and be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-xl flex flex-col gap-4"
                style={{
                  background: "oklch(0.16 0.04 240)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-tn text-xs" style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}>
                      NAME *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="px-4 py-3 rounded-md text-sm outline-none transition-all"
                      style={{
                        background: "oklch(0.20 0.035 240)",
                        border: "1px solid oklch(1 0 0 / 12%)",
                        color: "oklch(0.88 0.01 220)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-tn text-xs" style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="px-4 py-3 rounded-md text-sm outline-none transition-all"
                      style={{
                        background: "oklch(0.20 0.035 240)",
                        border: "1px solid oklch(1 0 0 / 12%)",
                        color: "oklch(0.88 0.01 220)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tn text-xs" style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}>
                    COMPANY / ORGANISATION
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Optional"
                    className="px-4 py-3 rounded-md text-sm outline-none transition-all"
                    style={{
                      background: "oklch(0.20 0.035 240)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: "oklch(0.88 0.01 220)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tn text-xs" style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}>
                    I'M INTERESTED IN
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="px-4 py-3 rounded-md text-sm outline-none transition-all"
                    style={{
                      background: "oklch(0.20 0.035 240)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: form.service ? "oklch(0.88 0.01 220)" : "oklch(0.50 0.03 220)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: "oklch(0.16 0.04 240)", color: "oklch(0.88 0.01 220)" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono-tn text-xs" style={{ color: "oklch(0.55 0.03 220)", letterSpacing: "0.08em" }}>
                    MESSAGE *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you need and what outcome you're looking for..."
                    rows={4}
                    className="px-4 py-3 rounded-md text-sm outline-none transition-all resize-none"
                    style={{
                      background: "oklch(0.20 0.035 240)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: "oklch(0.88 0.01 220)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary-tn flex items-center justify-center gap-2 group mt-2"
                >
                  <Send size={15} />
                  Send Enquiry
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
