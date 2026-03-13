import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "What We've Built", href: "#portfolio" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Free Audit", href: "#audit" },
    { label: "Services", href: "#services" },
    { label: "How We Work", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "/blog", isPage: true },
  ];

  const scrollTo = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) {
      navigate(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.12 0.04 240 / 95%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group shrink-0"
          >
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/truenorth-logo_94cc552d.png" alt="TrueNorth Operations Group" className="h-12 w-auto" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, link.isPage)}
                className="text-sm font-medium transition-colors duration-200 relative group"
                style={{ color: link.isPage ? "oklch(0.65 0.12 192)" : "oklch(0.70 0.02 220)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "oklch(0.65 0.12 192)" }}
                />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary-tn text-sm"
            >
              Book a Discovery Call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md"
            style={{ color: "oklch(0.65 0.12 192)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
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
            background: "oklch(0.14 0.04 240 / 98%)",
            backdropFilter: "blur(12px)",
            borderColor: "oklch(1 0 0 / 8%)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, link.isPage)}
                className="text-left py-3 px-2 text-sm font-medium border-b transition-colors duration-200"
                style={{
                  color: "oklch(0.70 0.02 220)",
                  borderColor: "oklch(1 0 0 / 6%)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary-tn text-sm mt-4 text-center"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
