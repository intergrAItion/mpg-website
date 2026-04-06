"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Users,
  Wrench,
  FileText,
  ClipboardList,
  BarChart2,
  Scale,
} from "lucide-react";

const services = [
  {
    icon: Users,
    heading: "Tenant Management",
    description:
      "Tenant sourcing, screening, placement, and ongoing communication.",
  },
  {
    icon: Wrench,
    heading: "Maintenance Coordination",
    description:
      "Logging, coordinating, and overseeing all maintenance and repair work.",
  },
  {
    icon: FileText,
    heading: "Lease Administration",
    description:
      "Drafting, renewing, and managing lease agreements in line with the Rental Housing Act.",
  },
  {
    icon: ClipboardList,
    heading: "Property Inspections",
    description:
      "Move-in, move-out, and routine inspections — all documented.",
  },
  {
    icon: BarChart2,
    heading: "Financial Reporting",
    description:
      "Monthly income and expense statements so you always know where you stand.",
  },
  {
    icon: Scale,
    heading: "Legal & Compliance",
    description:
      "Ensuring your property and tenancy meets all relevant South African regulations, including POPIA and RHA requirements.",
  },
];

export default function ServicesContent() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <SectionHeading title="What We Offer" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl"
          style={{ color: "#6B7280" }}
        >
          We offer a complete property management service for residential
          landlords. Whether you own one property or a growing portfolio, we
          handle every aspect of management so you don't have to.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-lg"
                style={{
                  backgroundColor: "#F8F7F4",
                  borderTop: "2px solid #C9A84C",
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(201,168,76,0.12)" }}
                >
                  <Icon size={20} style={{ color: "#C9A84C" }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant-garamond), serif",
                    color: "#1A1A1A",
                  }}
                >
                  {service.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
