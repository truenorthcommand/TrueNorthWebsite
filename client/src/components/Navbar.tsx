import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "What We've Built", href: "#portfolio" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Services", href: "#services" },
    { label: "How We Work", href: "#process" },
    { label: "About", href: "#about" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
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
            className="flex items-center gap-3 group"
          >
            <div className="relative w-8 h-8">
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.12 192), oklch(0.55 0.14 200))",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke="oklch(0.12 0.04 240)" strokeWidth="2" fill="none"/>
                  <path d="M12 3V21M4 8L20 16M20 8L4 16" stroke="oklch(0.12 0.04 240)" strokeWidth="1.5" opacity="0.6"/>
                </svg>
              </div>
            </div>
            <div>
              <span className="font-display font-700 text-sm tracking-wide text-white">TrueNorth</span>
              <span className="font-display font-300 text-sm tracking-wide" style={{ color: "oklch(0.65 0.12 192)" }}> Operations Group</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium transition-colors duration-200 relative group"
                style={{ color: "oklch(0.70 0.02 220)", fontFamily: "'DM Sans', sans-serif" }}
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
                onClick={() => scrollTo(link.href)}
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
