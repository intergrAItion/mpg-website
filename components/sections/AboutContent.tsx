"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircle, Eye, Hand } from "lucide-react";

const values = [
  {
    icon: CheckCircle,
    heading: "Reliable",
    description: "Careful coordination and follow-up for the everyday details.",
  },
  {
    icon: Eye,
    heading: "Transparent",
    description: "Clear updates and reporting that help you understand your rental.",
  },
  {
    icon: Hand,
    heading: "Hands-On",
    description: "Personal involvement in tenant assessment, administration and communication.",
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
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: "#5B6470" }}
          >
            MacFarlane Property Group helps landlords take the everyday administration of a rental
            off their shoulders. Founded by Dean MacFarlane, MPG brings together careful tenant
            assessment, lease coordination, maintenance communication and clear reporting.
            We support landlords in Cape Town, Mbombela and Johannesburg, keeping you involved
            in the decisions that matter to your property.
          </motion.p>
        </div>
      </section>

      {/* Experience Block */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 rounded-lg bg-white shadow-sm flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="flex-shrink-0 text-center md:text-left">
              <div
                className="text-4xl md:text-5xl font-semibold"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#876628" }}
              >
                Hands-on
              </div>
              <div
                className="text-sm font-medium mt-1"
                style={{ color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Rental management
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#5B6470" }}>
                Good rental management brings the details together. From assessing an application
                and coordinating a lease to arranging inspections and following up on maintenance,
                MPG gives your property organised attention and helps you keep a clear view of the tenancy.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#5B6470" }}>
                Our approach combines personal involvement with clear communication. You have less
                paperwork and follow-up to manage yourself, with updates that help you understand
                what is happening at your rental.
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
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 space-y-4"
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5B6470" }}>
              Dean MacFarlane founded MPG to make property management a clearer, more manageable
              part of a landlord’s life. The business brings care to tenant selection and structure
              to the administration that continues throughout a tenancy.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5B6470" }}>
              Dean’s hands-on approach brings tenant assessment, lease arrangements, inspections
              and maintenance communication into one management relationship. Clear records
              and practical follow-up help landlords stay involved without managing each detail themselves.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#5B6470" }}>
              We coordinate the everyday details and keep landlords involved in important decisions.
              The aim is a considered management relationship, with clear reporting, hands-on support
              and competitive fees tailored to the property.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Approach" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.heading}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-sm"
                  style={{ borderTop: "2px solid #C9A55A" }}
                >
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(201,165,90,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "#876628" }} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
                  >
                    {val.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
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
