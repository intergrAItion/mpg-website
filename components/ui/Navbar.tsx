"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/switch", label: "Switch to Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled
          ? "rgba(15, 30, 60, 0.97)"
          : "rgba(15, 30, 60, 1)",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          {/* PLACEHOLDER: Place logo.png in /public/logo.png before deploying */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="MacFarlane Property Group"
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              style={{ background: "transparent" }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.05em",
                  color: pathname === link.href ? "#C9A84C" : "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    pathname === link.href ? "#C9A84C" : "rgba(255,255,255,0.85)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
              style={{
                backgroundColor: "#C9A84C",
                color: "#0F1E3C",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E8C96A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C9A84C";
              }}
            >
              Get a Free Assessment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 flex flex-col px-6 py-8 gap-6"
          style={{ backgroundColor: "#0F1E3C" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                color: pathname === link.href ? "#C9A84C" : "rgba(255,255,255,0.9)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium mt-4"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0F1E3C",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Get a Free Assessment
          </Link>
        </div>
      )}
    </nav>
  );
}
