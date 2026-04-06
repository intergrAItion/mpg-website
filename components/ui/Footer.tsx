import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0F1E3C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + tagline */}
          {/* PLACEHOLDER: Place logo.png in /public/logo.jpeg before deploying */}
          <div className="lg:col-span-1">
            <img
              src="/logo.jpeg"
              alt="MacFarlane Property Group"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cape Town's modern property management company. Lower fees, faster response, total transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/switch", label: "Switch to Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-yellow-400"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Services
            </h3>
            <ul className="space-y-2">
              {[
                "Tenant Management",
                "Maintenance Coordination",
                "Lease Administration",
                "Property Inspections",
                "Financial Reporting",
                "Legal & Compliance",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm transition-colors duration-200 hover:text-yellow-400"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+27711720480"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-yellow-400"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <Phone size={14} />
                  071 172 0480
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27711720480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-yellow-400"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <MessageCircle size={14} />
                  WhatsApp: 071 172 0480
                </a>
              </li>
              <li>
                <a
                  href="mailto:dean@macfarlanepropertygroup.co.za"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-yellow-400"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <Mail size={14} />
                  dean@macfarlanepropertygroup.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            © 2025 MacFarlane Property Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/legal#privacy"
              className="text-xs transition-colors duration-200 hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal#terms"
              className="text-xs transition-colors duration-200 hover:text-yellow-400"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
