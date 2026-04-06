"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-semibold ${
          centered ? "gold-underline-center" : "gold-underline"
        }`}
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          color: light ? "#ffffff" : "#1A1A1A",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-base md:text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
          style={{ color: light ? "rgba(255,255,255,0.75)" : "#6B7280" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
