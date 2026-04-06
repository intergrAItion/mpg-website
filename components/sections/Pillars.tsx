"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, MessageSquare } from "lucide-react";

const pillars = [
  {
    icon: DollarSign,
    heading: "Lower Fees",
    description:
      "Competitive management fees below the industry standard of 10–12%.",
  },
  {
    icon: Zap,
    heading: "Faster Response",
    description:
      "Direct, hands-on management with prompt communication and quick action.",
  },
  {
    icon: MessageSquare,
    heading: "Clear Communication",
    description:
      "No chasing, no confusion. You stay informed without lifting a finger.",
  },
];

export default function Pillars() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F8F7F4" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm"
                style={{ borderTop: "2px solid #C9A84C" }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)" }}
                >
                  <Icon size={20} style={{ color: "#C9A84C" }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    color: "#1A1A1A",
                  }}
                >
                  {pillar.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
