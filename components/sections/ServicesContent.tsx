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
      "Tenant sourcing and assessment, recommendations for your decision, and communication throughout the tenancy.",
  },
  {
    icon: Wrench,
    heading: "Maintenance Coordination",
    description:
      "Contractor communication and follow-up, with clear updates about work that needs attention.",
  },
  {
    icon: FileText,
    heading: "Lease Administration",
    description:
      "Lease preparation, signing coordination and renewals, with organised tenancy records.",
  },
  {
    icon: ClipboardList,
    heading: "Property Inspections",
    description:
      "Documented move-in and move-out inspections to help you keep a clear record of the property’s condition.",
  },
  {
    icon: BarChart2,
    heading: "Financial Reporting",
    description:
      "Monthly financial reporting and payment updates, so you can keep a clear view of your rental.",
  },
  {
    icon: Scale,
    heading: "Tenancy & Compliance Administration",
    description:
      "Organised tenancy records and compliance-related paperwork, with clear information for landlord decisions.",
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl"
          style={{ color: "#5B6470" }}
        >
          MPG helps landlords in Cape Town, Mbombela and Johannesburg bring the everyday running
          of a rental into one organised management relationship. From tenant assessment and lease
          arrangements to maintenance coordination and reporting, we take the administration off
          your shoulders and keep you informed.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.heading}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-lg"
                style={{
                  backgroundColor: "#F5F0E8",
                  borderTop: "2px solid #C9A55A",
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(201,165,90,0.12)" }}
                >
                  <Icon size={20} style={{ color: "#C9A55A" }} />
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
                <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
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
