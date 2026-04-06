"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ValueProp() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-medium mb-8"
          style={{
            fontFamily: "var(--font-cormorant-garamond), serif",
            fontStyle: "italic",
            color: "#1A1A1A",
          }}
        >
          "We help landlords reduce management costs while improving
          communication, response time, and overall visibility — so you earn
          more and worry less."
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium transition-colors duration-200"
            style={{
              color: "#C9A84C",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#E8C96A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#C9A84C";
            }}
          >
            Learn About Our Services →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
