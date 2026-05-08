"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const included = [
  "Tenant communication and relationship management",
  "Maintenance logging and contractor coordination",
  "Lease administration and renewals",
  "Move-in and move-out inspections",
  "Monthly financial reporting",
  "Legal and compliance oversight",
  "Regular property updates and reporting",
];

const comparison = [
  {
    feature: "Fees",
    typical: "10–12%",
    mpg: "Below standard",
  },
  {
    feature: "Communication",
    typical: "Slow",
    mpg: "Direct & fast",
  },
  {
    feature: "Response Time",
    typical: "Delayed",
    mpg: "Prompt",
  },
  {
    feature: "Transparency",
    typical: "Limited",
    mpg: "Full",
  },
];

export default function PricingContent() {
  return (
    <>
      {/* Pricing Card */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-lg"
            style={{ border: "1px solid #e5e7eb" }}
          >
            {/* Card header */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#0F1E3C" }}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#C9A84C", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Monthly Management Fee
              </p>
              <div
                className="text-3xl md:text-4xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#C9A84C" }}
              >
                Below Industry Standard
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Our management fees are competitively priced below the industry
                standard of 10–12%, giving you more of your rental income back.
              </p>
            </div>

            {/* Card body */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#F8F7F4" }}>
              <p
                className="text-sm font-semibold uppercase tracking-wide mb-5"
                style={{ color: "#1A1A1A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                What's Included:
              </p>
              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="rounded-md p-4 mb-8 text-sm italic"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  color: "#6B7280",
                }}
              >
                Tenant placement and onboarding fees are available and discussed
                on enquiry based on your specific needs.
              </div>

              <Link
                href="/contact"
                className="btn-gold inline-flex w-full items-center justify-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200"
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
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F7F4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <SectionHeading title="Why We're Different" centered />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg shadow-sm"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="grid grid-cols-3 bg-white">
              <div className="p-4 font-semibold text-sm" style={{ color: "#6B7280" }}>
                &nbsp;
              </div>
              <div
                className="p-4 text-center font-semibold text-sm"
                style={{ color: "#6B7280", borderLeft: "1px solid #e5e7eb" }}
              >
                Typical Agency
              </div>
              <div
                className="p-4 text-center font-semibold text-sm"
                style={{
                  color: "#0F1E3C",
                  borderLeft: "4px solid #C9A84C",
                  backgroundColor: "rgba(201,168,76,0.06)",
                }}
              >
                MacFarlane Property Group
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3"
                style={{
                  backgroundColor: i % 2 === 0 ? "#F8F7F4" : "white",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div
                  className="p-4 text-sm font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {row.feature}
                </div>
                <div
                  className="p-4 text-sm text-center"
                  style={{ color: "#6B7280", borderLeft: "1px solid #e5e7eb" }}
                >
                  {row.typical}
                </div>
                <div
                  className="p-4 text-sm text-center font-medium"
                  style={{
                    color: "#C9A84C",
                    borderLeft: "4px solid #C9A84C",
                    backgroundColor: "rgba(201,168,76,0.04)",
                  }}
                >
                  {row.mpg}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
