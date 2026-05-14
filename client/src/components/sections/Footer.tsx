const LOGO_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-logo-white_transparent.png";

const NAV_LINKS = [
  { label: "What We've Built", href: "#portfolio" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Free Audit", href: "#audit" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("/")) { window.location.href = href; return; }
    const isHome = window.location.pathname === "/";
    if (!isHome) { window.location.href = `/${href}`; return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", zIndex: 1 }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <img src={LOGO_CDN} alt="TrueNorth Operations Group" className="h-8 w-auto object-contain object-left" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,248,0.5)" }}>AI systems and automation that eliminate friction, amplify leverage, and deliver measurable outcomes.</p>
            <p className="text-xs" style={{ color: "rgba(240,244,248,0.3)" }}>Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR</p>
            <p className="text-xs" style={{ color: "rgba(240,244,248,0.3)" }}>Company No. 16854356 — Registered in England and Wales</p>
          </div>
          <div>
            <p className="font-display font-semibold text-sm mb-4" style={{ color: "#f0f4f8" }}>Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <button key={link.label} onClick={() => scrollTo(link.href)} className="text-left text-sm transition-colors hover:text-cyan-400" style={{ color: "rgba(240,244,248,0.5)" }}>{link.label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display font-semibold text-sm mb-4" style={{ color: "#f0f4f8" }}>Legal</p>
            <div className="flex flex-col gap-2">
              <a href="/privacy" className="text-sm transition-colors hover:text-cyan-400" style={{ color: "rgba(240,244,248,0.5)" }}>Privacy Policy</a>
              <a href="/terms" className="text-sm transition-colors hover:text-cyan-400" style={{ color: "rgba(240,244,248,0.5)" }}>Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(240,244,248,0.3)" }}>© 2026 TrueNorth Operations Group. All rights reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)" }}>
            <span className="text-xs font-medium" style={{ color: "#00FFFF" }}>⚡</span>
            <p className="text-xs font-semibold" style={{ color: "#00FFFF" }}>Powered by TrueNorthOS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
