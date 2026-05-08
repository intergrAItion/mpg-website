"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTABannerProps {
  heading: string;
  subheading: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function CTABanner({
  heading,
  subheading,
  buttonLabel,
  buttonHref,
}: CTABannerProps) {
  return (
    <section style={{ backgroundColor: "#0F1E3C" }} className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
          >
            {heading}
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            {subheading}
          </p>
          <Link
            href={buttonHref}
            className="btn-gold inline-flex items-center px-8 py-4 rounded-md font-medium transition-colors duration-200"
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
            {buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
