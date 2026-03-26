import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-logo-transparent_04e70ea6.png";

const links = [
  { label: "What We've Built", href: "#portfolio" },
  { label: "Marketplace",      href: "#marketplace" },
  { label: "Free Audit",       href: "#audit" },
  { label: "Services",         href: "#services" },
  { label: "How We Work",      href: "#process" },
  { label: "About",            href: "#about" },
  { label: "Blog",             href: "/blog", isPage: true },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate]        = useLocation();

  // True when we are NOT on the homepage — any route other than "/"
  const isOffHome = location !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Route-aware navigation.
   * On homepage  → smooth-scroll to anchor directly.
   * Off homepage → navigate to "/#section" so home loads and scrolls on arrival.
   * Page links   → always use wouter navigate (e.g. /blog).
   */
  const handleNav = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) { navigate(href); return; }
    if (isOffHome) { window.location.href = `/${href}`; return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,11,20,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-28 md:h-32">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); setMobileOpen(false); if (isOffHome) { navigate("/"); } else { window.scrollTo({ top: 0, behavior: "smooth" }); } }}
            className="shrink-0"
          >
            <img
              src={LOGO}
              alt="TrueNorth Operations Group"
              className="h-24 md:h-28 w-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 16px rgba(0,255,255,0.4))",
                maxWidth: "390px",
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.isPage)}
                className="text-sm font-medium transition-colors duration-200 relative group"
                style={{
                  color: link.isPage ? "#00FFFF" : "rgba(240,244,248,0.7)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "#00FFFF" }}
                />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <button onClick={() => handleNav("#contact")} className="btn-primary text-sm">
              Book a Discovery Call
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-md"
            style={{ color: "#00FFFF" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            background: "rgba(6,11,20,0.98)",
            backdropFilter: "blur(14px)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.isPage)}
                className="text-left py-3 px-2 text-sm font-medium border-b transition-colors duration-200 hover:text-[#00FFFF]"
                style={{
                  color: link.isPage ? "#00FFFF" : "rgba(240,244,248,0.75)",
                  borderColor: "rgba(255,255,255,0.06)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="btn-primary text-sm mt-4 text-center"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
