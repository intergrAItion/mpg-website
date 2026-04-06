"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import LeadForm from "@/components/ui/LeadForm";

export default function HomeLeadSection() {
  return (
    <section className="py-24 px-4 bg-white" id="assessment">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <SectionHeading
            title="Get a Free Rental Assessment"
            subtitle="Tell us about your property and we'll be in touch within 24 hours."
            centered
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
