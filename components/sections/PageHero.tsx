"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  heading: string;
  subheading: string;
}

export default function PageHero({ heading, subheading }: PageHeroProps) {
  return (
    <section
      className="flex items-center justify-center px-4 pt-32 pb-20"
      style={{ minHeight: "40vh", backgroundColor: "#0F1E3C" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          MacFarlane Property Group
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
}
