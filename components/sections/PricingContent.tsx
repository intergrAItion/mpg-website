"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const included = [
  "Tenant communication and relationship management",
  "Maintenance logging and contractor coordination",
  "Lease administration and renewals",
  "Move-in and move-out inspections",
  "Monthly financial reporting",
  "Tenancy & Compliance Administration",
  "Regular property updates and reporting",
];

const comparison = [
  { feature: "Fees", typical: "The service and total cost", mpg: "A quote tailored to your property" },
  { feature: "Communication", typical: "How you stay informed", mpg: "Tenant communication and property updates" },
  { feature: "Maintenance", typical: "Who coordinates the details", mpg: "Contractor communication and follow-up" },
  { feature: "Reporting", typical: "A clear view of your rental", mpg: "Monthly financial reporting" },
];

export default function PricingContent() {
  return (
    <>
      {/* Pricing Card */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-lg"
            style={{ border: "1px solid #e5e7eb" }}
          >
            {/* Card header */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#07341C" }}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#C9A55A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Monthly Management Fee
              </p>
              <div
                className="text-3xl md:text-4xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#C9A55A" }}
              >
                Fees Tailored to Your Property
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Your property and the support you need shape the management quote. We explain
                the ongoing fee and any separate tenant placement or administration costs,
                so you can consider the service with confidence.
              </p>
            </div>

            {/* Card body */}
            <div className="p-8 md:p-10" style={{ backgroundColor: "#F5F0E8" }}>
              <p
                className="text-sm font-semibold uppercase tracking-wide mb-5"
                style={{ color: "#1A1A1A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                What’s Included:
              </p>
              <ul className="space-y-3 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={16} style={{ color: "#C9A55A", flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
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
                  color: "#5B6470",
                }}
              >
                Tenant placement and onboarding fees are available and discussed
                on enquiry based on your specific needs.
              </div>

              <Link
                href="/contact"
                className="btn-gold inline-flex w-full items-center justify-center px-8 py-4 rounded-md font-medium text-sm transition-colors duration-200"
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
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <SectionHeading title="Choosing Your Management Service" centered />
          </div>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg shadow-sm"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="grid grid-cols-3 bg-white">
              <div className="min-w-0 wrap-anywhere p-2 sm:p-4 font-semibold text-sm" style={{ color: "#5B6470" }}>
                What matters
              </div>
              <div
                className="min-w-0 wrap-anywhere p-2 sm:p-4 text-center font-semibold text-sm"
                style={{ color: "#5B6470", borderLeft: "1px solid #e5e7eb" }}
              >
                What to consider
              </div>
              <div
                className="min-w-0 wrap-anywhere p-2 sm:p-4 text-center font-semibold text-sm"
                style={{
                  color: "#07341C",
                  borderLeft: "4px solid #C9A55A",
                  backgroundColor: "rgba(201,165,90,0.06)",
                }}
              >
                How MPG helps
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3"
                style={{
                  backgroundColor: i % 2 === 0 ? "#F5F0E8" : "white",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div
                  className="min-w-0 wrap-anywhere p-2 sm:p-4 text-sm font-medium"
                  style={{ color: "#1A1A1A" }}
                >
                  {row.feature}
                </div>
                <div
                  className="min-w-0 wrap-anywhere p-2 sm:p-4 text-sm text-center"
                  style={{ color: "#5B6470", borderLeft: "1px solid #e5e7eb" }}
                >
                  {row.typical}
                </div>
                <div
                  className="min-w-0 wrap-anywhere p-2 sm:p-4 text-sm text-center font-medium"
                  style={{
                    color: "#876628",
                    borderLeft: "4px solid #C9A55A",
                    backgroundColor: "rgba(201,165,90,0.04)",
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
