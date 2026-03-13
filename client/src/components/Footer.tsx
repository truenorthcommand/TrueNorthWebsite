import { useLocation } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-logo_c008cd1a.png";

const navLinks = [
  { label: "What We've Built", href: "#portfolio" },
  { label: "Marketplace",      href: "#marketplace" },
  { label: "Free Audit",       href: "#audit" },
  { label: "Services",         href: "#services" },
  { label: "How We Work",      href: "#process" },
  { label: "About",            href: "#about" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms",   href: "#" },
  { label: "Blog",    href: "/blog", isPage: true },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [, navigate] = useLocation();

  const scrollTo = (href: string, isPage?: boolean) => {
    if (isPage) { navigate(href); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "rgba(4,8,16,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <img src={LOGO} alt="TrueNorth Operations Group" className="h-10 w-auto" />
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,248,0.5)" }}>
              AI-powered operational systems for founders, operators, and growing businesses.
              The complexity is ours. The results are yours.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-3">
            <p className="section-label mb-1">Navigation</p>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-left transition-colors duration-200 hover:text-[#00FFFF]"
                style={{ color: "rgba(240,244,248,0.55)", fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Legal + Contact */}
          <div className="flex flex-col gap-3">
            <p className="section-label mb-1">Legal & Contact</p>
            {legalLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, link.isPage)}
                className="text-sm text-left transition-colors duration-200 hover:text-[#00FFFF]"
                style={{ color: "rgba(240,244,248,0.55)", fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(240,244,248,0.35)", fontFamily: "'Inter', sans-serif" }}>
            © 2026 TrueNorth Operations Group. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(0,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Powered by TrueNorthOS
          </p>
        </div>
      </div>
    </footer>
  );
}
