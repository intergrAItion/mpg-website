"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircle, Eye, Hand } from "lucide-react";

const values = [
  {
    icon: CheckCircle,
    heading: "Reliable",
    description: "We do what we say we'll do, when we say we'll do it.",
  },
  {
    icon: Eye,
    heading: "Transparent",
    description: "Clear communication, honest reporting, no surprises.",
  },
  {
    icon: Hand,
    heading: "Hands-On",
    description: "Direct involvement at every stage — not managed from a distance.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Who We Are */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Who We Are" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            MacFarlane Property Group is a modern property management company
            focused on delivering reliable, cost-effective solutions for
            landlords across South Africa. We combine deep industry knowledge with
            a hands-on, transparent approach — so your investment is protected
            and your tenants are well-managed.
          </motion.p>
        </div>
      </section>

      {/* Experience Block */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F7F4" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 rounded-lg bg-white shadow-sm flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="flex-shrink-0 text-center md:text-left">
              <div
                className="text-5xl md:text-6xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#C9A84C" }}
              >
                10+
              </div>
              <div
                className="text-sm font-medium mt-1"
                style={{ color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Years Industry Experience
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#6B7280" }}>
                Built on over a decade of experience in the property management
                industry through close involvement in an established family-run
                property business, MacFarlane Property Group combines proven
                industry knowledge with a modern, responsive approach.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
                Our background spans the full spectrum of property management —
                from lease creation and tenant placement, to maintenance
                oversight, property inspections, health and safety compliance,
                and legal adherence under the Rental Housing Act.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Founded with Purpose" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#6B7280" }}>
              MacFarlane Property Group was founded by Dean MacFarlane, whose
              career in property spans management, construction oversight,
              health and safety compliance, and the full lifecycle of
              residential tenancy — from finding the right tenant to managing
              every detail in between.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#6B7280" }}>
              The business was established with a clear mission: to offer South
              African landlords a better alternative — one that is more affordable,
              more responsive, and more transparent than the traditional agency
              model.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F8F7F4" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Approach" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.heading}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-sm"
                  style={{ borderTop: "2px solid #C9A84C" }}
                >
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(201,168,76,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
                  >
                    {val.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
