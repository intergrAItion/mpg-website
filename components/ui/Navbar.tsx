"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/quote", label: "Get a Quote" },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 min-h-[113px] md:min-h-[164px]"
      style={{
        backgroundColor: isScrolled
          ? "rgba(7, 52, 28, 0.97)"
          : "rgba(7, 52, 28, 1)",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        borderBottom: "1px solid rgba(201, 165, 90, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 min-h-[113px] md:min-h-[164px]">
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px',
            margin: '0px',
            flexShrink: 0
          }}>
            <Image
              src="/logo-green.png"
              alt="MacFarlane Property Group"
              width={265}
              height={136}
              unoptimized
              style={{objectFit: 'contain'}}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-nowrap overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.05em",
                  color: pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#C9A55A";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.85)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0"
              style={{
                backgroundColor: "#C9A55A",
                color: "#07341C",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E0C078";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C9A55A";
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
          className="md:hidden fixed inset-0 top-[113px] z-40 flex flex-col px-6 py-8 gap-6"
          style={{ backgroundColor: "#07341C" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium transition-colors duration-200"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                color: pathname === link.href ? "#C9A55A" : "rgba(255,255,255,0.9)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium mt-4"
            style={{
              backgroundColor: "#C9A55A",
              color: "#07341C",
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
