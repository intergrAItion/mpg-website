"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" },
  { href: "/services", label: "Services" }, { href: "/blog", label: "Blog" },
  { href: "/quote", label: "Get a Quote" }, { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // A menu belongs to the route on which it was opened; navigation cannot leave it open.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const pathname = usePathname();
  const isMenuOpen = menuPath === pathname;
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const content = document.getElementById("site-content");
    const previousInert = content?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    if (content) content.inert = true;
    document.body.style.overflow = "hidden";
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktop = () => { if (breakpoint.matches) setMenuPath(null); };
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault(); setMenuPath(null); toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = Array.from(navRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? [])
          .filter(element => element.getClientRects().length > 0);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeys);
    breakpoint.addEventListener("change", closeAtDesktop);
    return () => {
      if (content) content.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeys);
      breakpoint.removeEventListener("change", closeAtDesktop);
    };
  }, [isMenuOpen]);

  return (
    <nav ref={navRef} aria-label="Primary" className="site-header fixed top-0 inset-x-0 z-[60] border-b border-mpg-gold/20"
      style={{ backgroundColor: isScrolled ? "rgba(7,52,28,0.97)" : "#07341C", backdropFilter: isScrolled ? "blur(8px)" : "none" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-5">
        <Link href="/" onClick={() => setMenuPath(null)} className="shrink-0">
          <Image
            src="/logo-green.png"
            alt="MacFarlane Property Group"
            width={265}
            height={136}
            quality={90}
            sizes="(min-width: 1280px) 230px, 160px"
            loading="eager"
            className="header-logo object-contain"
          />
        </Link>
        <div className="hidden xl:flex items-center gap-6 whitespace-nowrap">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}
              className={`text-sm font-medium tracking-wide hover:text-mpg-gold-light ${pathname === link.href ? "text-mpg-gold" : "text-white/90"}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/contact" className="hidden xl:inline-flex btn-gold shrink-0 items-center px-5 py-2.5 rounded-md text-sm font-medium bg-mpg-gold text-mpg-green hover:bg-mpg-gold-light whitespace-nowrap">Get a Free Assessment</Link>
        <button ref={toggleRef} type="button" className="xl:hidden text-white p-3 shrink-0" aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setMenuPath(isMenuOpen ? null : pathname)}>
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-navigation" className={`${isMenuOpen ? "flex" : "hidden"} xl:hidden mobile-navigation fixed inset-x-0 z-40 flex-col gap-4 px-6 py-6 bg-mpg-green overflow-y-auto`}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setMenuPath(null)} aria-current={pathname === link.href ? "page" : undefined}
            className={`text-lg font-medium py-1 hover:text-mpg-gold-light ${pathname === link.href ? "text-mpg-gold" : "text-white/90"}`}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMenuPath(null)} className="btn-gold inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium mt-2 bg-mpg-gold text-mpg-green hover:bg-mpg-gold-light">Get a Free Assessment</Link>
      </div>
    </nav>
  );
}
