"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    heading: "Onboarding",
    description:
      "We gather your property details and understand your specific needs and goals.",
  },
  {
    number: "02",
    heading: "Active Management",
    description:
      "We handle tenant communication, maintenance coordination, and day-to-day operations.",
  },
  {
    number: "03",
    heading: "Ongoing Oversight",
    description:
      "You stay informed while we handle the work. Regular updates, no surprises.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4"
      style={{ backgroundColor: "#F8F7F4" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <SectionHeading title="How It Works" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px"
            style={{ backgroundColor: "rgba(201,168,76,0.3)" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center md:text-left"
            >
              <div
                className="inline-block text-5xl md:text-6xl font-semibold mb-4 relative z-10"
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  color: "#C9A84C",
                }}
              >
                {step.number}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-cormorant-garamond), serif",
                  color: "#1A1A1A",
                }}
              >
                {step.heading}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
