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
  const [, navigate]                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) { navigate(href); return; }
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
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="shrink-0 flex items-center gap-3"
          >
            {/* Compass icon — square crop of the centre of the image */}
            <div
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                borderRadius: 8,
                overflow: "hidden",
                filter: "drop-shadow(0 0 10px rgba(0,255,255,0.4))",
              }}
            >
              <img
                src={LOGO}
                alt="TrueNorth compass"
                style={{
                  width: 200,
                  height: 200,
                  marginTop: -74,
                  marginLeft: -74,
                  objectFit: "none",
                }}
              />
            </div>
            {/* Wordmark */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                TrueNorth
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 13, color: "#00FFFF", letterSpacing: "0.04em", lineHeight: 1.2 }}>
                Operations Group
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, link.isPage)}
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
            <button onClick={() => scrollTo("#contact")} className="btn-primary text-sm">
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
                onClick={() => scrollTo(link.href, link.isPage)}
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
              onClick={() => scrollTo("#contact")}
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
