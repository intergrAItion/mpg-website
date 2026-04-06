"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: image moves at 0.4x scroll speed
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Hero background image with parallax */}
      {/* PLACEHOLDER: Place hero.jpg in /public/hero.jpeg before deploying */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/hero.jpeg')",
            filter: "grayscale(100%)",
            transform: "scale(1.1)",
          }}
        />
      </motion.div>

      {/* Dark navy overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(15, 30, 60, 0.65)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase mb-6"
          style={{
            color: "#C9A84C",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          MacFarlane Property Group
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          Property Management Done Right —{" "}
          <span style={{ fontStyle: "italic" }}>Tailored to You,</span> Designed to
          Save You Money.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Cape Town's modern property management company. Lower fees, faster
          response, total transparency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200 w-full sm:w-auto justify-center"
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
          <Link
            href="#how-it-works"
            className="inline-flex items-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200 w-full sm:w-auto justify-center border"
            style={{
              borderColor: "#C9A84C",
              color: "#C9A84C",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            How It Works
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce"
      >
        <ChevronDown size={28} style={{ color: "rgba(255,255,255,0.5)" }} />
      </motion.div>
    </section>
  );
}
