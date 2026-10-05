"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  TrendingDown,
  MessageSquareOff,
  Wrench,
  Eye,
  AlertTriangle,
} from "lucide-react";

const painPoints = [
  {
    icon: TrendingDown,
    heading: "High Fees",
    description: "Unsure whether your management fee reflects the service you receive?",
  },
  {
    icon: MessageSquareOff,
    heading: "Poor Communication",
    description: "Chasing your agent for updates that never come?",
  },
  {
    icon: Wrench,
    heading: "Slow Maintenance",
    description: "Tenants complaining while issues sit unresolved?",
  },
  {
    icon: Eye,
    heading: "Lack of Transparency",
    description: "Unclear reporting and unexplained deductions?",
  },
  {
    icon: AlertTriangle,
    heading: "Unreliable Service",
    description: "Promises made but not delivered on?",
  },
];

const switchSteps = [
  {
    num: "1",
    heading: "You Contact Us",
    description:
      "Reach out via our form, WhatsApp, or phone. No commitment required.",
  },
  {
    num: "2",
    heading: "We Review Your Setup",
    description:
      "We look at your current arrangement and understand your needs.",
  },
  {
    num: "3",
    heading: "We Handle the Transition",
    description: "We manage the handover process professionally and efficiently.",
  },
  {
    num: "4",
    heading: "Stay Informed",
    description:
      "We take care of the day-to-day administration and keep you involved in important decisions.",
  },
];

export default function SwitchContent() {
  return (
    <>
      {/* Sound familiar? */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <SectionHeading title="Sound familiar?" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.heading}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: "#F5F0E8",
                    borderTop: "2px solid #C9A55A",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center mb-3"
                    style={{ backgroundColor: "rgba(201,165,90,0.1)" }}
                  >
                    <Icon size={18} style={{ color: "#C9A55A" }} />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant-garamond), serif",
                      color: "#1A1A1A",
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Handle the Switch */}
      <section className="py-20 px-4" style={{ backgroundColor: "#07341C" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white gold-underline-center"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              Here’s How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {switchSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-4xl md:text-5xl font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    color: "#C9A55A",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-lg font-semibold text-white mb-2"
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                >
                  {step.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200"
              style={{
                backgroundColor: "#C9A55A",
                color: "#07341C",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#E0C078";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#C9A55A";
              }}
            >
              Start Your Switch Today
            </Link>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "#5B6470" }}>
              Switching managers starts with understanding your current arrangements.
              We coordinate the handover, bring the relevant records together and keep you informed,
              so you can make the change with confidence. Tell us about your property and we’ll talk through the next steps.
            </p>
            <a
              href="https://wa.me/27711720480"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium underline transition-colors duration-200"
              style={{
                color: "#876628",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#07341C";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#876628";
              }}
            >
              Have questions? WhatsApp us directly
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
