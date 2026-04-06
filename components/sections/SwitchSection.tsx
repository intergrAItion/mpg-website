"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingDown, MessageSquareOff, Wrench, Eye, AlertTriangle } from "lucide-react";

const painPoints = [
  { icon: TrendingDown, label: "High management fees" },
  { icon: MessageSquareOff, label: "Poor or slow communication" },
  { icon: Wrench, label: "Delayed maintenance response" },
  { icon: Eye, label: "Lack of transparency" },
  { icon: AlertTriangle, label: "Unreliable service" },
];

const steps = [
  { num: "1", label: "You contact us" },
  { num: "2", label: "We review your setup" },
  { num: "3", label: "We handle the transition" },
  { num: "4", label: "You relax" },
];

export default function SwitchSection() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#0F1E3C" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 gold-underline-center"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
          >
            Switch Property Managers Without the Hassle
          </h2>
          <p className="text-base md:text-lg mt-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            Tired of your current property manager? You're not alone.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
          {painPoints.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Icon size={18} style={{ color: "#C9A84C", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Process flow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      backgroundColor: "#C9A84C",
                      color: "#0F1E3C",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {step.num}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className="hidden sm:block text-lg mx-2"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Link
            href="/contact"
            className="btn-gold inline-flex items-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200"
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
            Start Your Switch Today
          </Link>
        </div>
      </div>
    </section>
  );
}
