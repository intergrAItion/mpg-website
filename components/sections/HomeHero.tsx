"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background image with parallax ── */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY }}>
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/hero.jpeg')",
            filter: "grayscale(100%)",
            transform: "scale(1.1)",
          }}
        />
      </motion.div>

      {/* ── Layered overlays for depth and readability ── */}
      {/* Base tint */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(15, 30, 60, 0.45)" }}
      />
      {/* Directional gradient — heavy left, fades right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,30,60,0.95) 0%, rgba(15,30,60,0.80) 40%, rgba(15,30,60,0.30) 70%, rgba(15,30,60,0.10) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35vh",
          background:
            "linear-gradient(to top, rgba(15,30,60,0.85) 0%, transparent 100%)",
        }}
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "20vh",
          background:
            "linear-gradient(to bottom, rgba(15,30,60,0.6) 0%, transparent 100%)",
        }}
      />

      {/* ── Main content — left-anchored, bottom-positioned ── */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: contentY, paddingBottom: "9vh" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">

            {/* Overline with horizontal accent line */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <div
                style={{
                  width: "36px",
                  height: "1px",
                  backgroundColor: "#C9A84C",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: "#C9A84C",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                MacFarlane Property Group
              </span>
            </motion.div>

            {/* H1 — cinematic multi-line, word-breaks as design */}
            <motion.h1
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-cormorant-garamond), serif",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3.75rem, 9.5vw, 8.5rem)",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.015em",
                }}
              >
                Property
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3.75rem, 9.5vw, 8.5rem)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#C9A84C",
                  letterSpacing: "-0.015em",
                }}
              >
                Management
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(2.25rem, 5.5vw, 5rem)",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.90)",
                  letterSpacing: "0.01em",
                  marginTop: "0.3em",
                }}
              >
                Done Right.
              </span>
            </motion.h1>

            {/* Animated gold rule */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72px" }}
              transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
              style={{
                height: "1px",
                backgroundColor: "#C9A84C",
                marginTop: "2rem",
                marginBottom: "2rem",
                overflow: "hidden",
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.40 }}
              style={{
                color: "rgba(255,255,255,0.70)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                maxWidth: "400px",
                marginBottom: "2.5rem",
              }}
            >
              AI-assisted property management for landlords across South Africa.
              Lower fees, faster response, complete transparency.
            </motion.p>

            {/* CTA buttons — left-aligned, not centred */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200"
                style={{
                  backgroundColor: "#C9A84C",
                  color: "#0F1E3C",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.05em",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#E8C96A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#C9A84C";
                }}
              >
                Get a Free Assessment
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-medium text-sm transition-all duration-200 border"
                style={{
                  borderColor: "rgba(201,168,76,0.5)",
                  color: "#C9A84C",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.05em",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(201,168,76,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(201,168,76,0.5)";
                }}
              >
                How It Works
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom-left trust badge — 7% fee stat ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.55 }}
        className="absolute bottom-8 right-6 sm:right-10 lg:right-16 z-10"
      >
        <div
          className="flex items-center gap-4 px-5 py-3.5"
          style={{
            border: "1px solid rgba(201,168,76,0.22)",
            backgroundColor: "rgba(15,30,60,0.55)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant-garamond), serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "#C9A84C",
              lineHeight: 1,
            }}
          >
            7%
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              backgroundColor: "rgba(201,168,76,0.25)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              color: "rgba(255,255,255,0.60)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            All-inclusive
            <br />
            management fee
          </span>
        </div>
      </motion.div>

      {/* ── Bottom-left: editorial vertical scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-6 sm:left-10 lg:left-16 z-10 flex flex-col items-center gap-3"
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "9px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.6) 0%, rgba(201,168,76,0.05) 100%)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}
