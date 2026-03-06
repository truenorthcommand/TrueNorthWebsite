import { Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: "oklch(0.10 0.04 240)",
        borderColor: "oklch(1 0 0 / 8%)",
      }}
    >
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.12 192), oklch(0.55 0.14 200))" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke="oklch(0.12 0.04 240)" strokeWidth="2" fill="none"/>
                  <path d="M12 3V21M4 8L20 16M20 8L4 16" stroke="oklch(0.12 0.04 240)" strokeWidth="1.5" opacity="0.6"/>
                </svg>
              </div>
              <span className="font-display font-semibold text-sm" style={{ color: "oklch(0.88 0.01 220)" }}>
                TrueNorth Operations Group
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4 max-w-xs"
              style={{ color: "oklch(0.55 0.03 220)" }}
            >
              AI-powered operational systems for everyone — from individuals to enterprises. The complexity is ours. The results are yours.
            </p>
            <a
              href="https://www.linkedin.com/in/matthewcottam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: "oklch(0.55 0.03 220)" }}
            >
              <Linkedin size={16} />
              <span className="text-xs font-mono-tn" style={{ letterSpacing: "0.08em" }}>LINKEDIN</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <span className="section-label mb-4 block">Navigation</span>
            <div className="flex flex-col gap-2">
              {[
                { label: "What We've Built", href: "#portfolio" },
                { label: "Marketplace", href: "#marketplace" },
                { label: "Services", href: "#services" },
                { label: "How We Work", href: "#process" },
                { label: "About", href: "#about" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm transition-colors"
                  style={{ color: "oklch(0.55 0.03 220)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="section-label mb-4 block">Contact</span>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "oklch(0.55 0.03 220)" }}>
              <a href="mailto:hello@truenorthoperationsgroup.com" className="transition-colors hover:text-white">
                hello@truenorthoperationsgroup.com
              </a>
              <span>Ashford, Kent, UK</span>
              <button
                onClick={() => scrollTo("#contact")}
                className="text-left transition-colors mt-2"
                style={{ color: "oklch(0.65 0.12 192)" }}
              >
                Book a Discovery Call →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t"
          style={{ borderColor: "oklch(1 0 0 / 6%)" }}
        >
          <p className="font-mono-tn text-xs" style={{ color: "oklch(0.40 0.03 220)", letterSpacing: "0.06em" }}>
            © {year} TRUENORTH OPERATIONS GROUP LTD · REG. 16854356
          </p>
          <p className="font-mono-tn text-xs" style={{ color: "oklch(0.40 0.03 220)", letterSpacing: "0.06em" }}>
            POWERED BY TRUENORTHOS
          </p>
        </div>
      </div>
    </footer>
  );
}
