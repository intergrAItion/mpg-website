"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import LeadForm from "@/components/ui/LeadForm";

export default function ContactContent() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold mb-8 gold-underline"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
            >
              Contact Details
            </h2>

            <div className="space-y-5">
              <a
                href="tel:+27711720480"
                className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 group"
                style={{ backgroundColor: "#F8F7F4" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F4";
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                >
                  <Phone size={18} style={{ color: "#C9A84C" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#6B7280" }}>
                    Phone
                  </p>
                  <p className="text-base font-medium" style={{ color: "#1A1A1A" }}>
                    071 172 0480
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/27711720480"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: "#F8F7F4" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F4";
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(37,211,102,0.12)" }}
                >
                  <MessageCircle size={18} style={{ color: "#25D366" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#6B7280" }}>
                    WhatsApp
                  </p>
                  <p className="text-base font-medium" style={{ color: "#1A1A1A" }}>
                    071 172 0480
                  </p>
                </div>
              </a>

              <a
                href="mailto:dean@macfarlanepropertygroup.co.za"
                className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: "#F8F7F4" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,168,76,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F4";
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                >
                  <Mail size={18} style={{ color: "#C9A84C" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#6B7280" }}>
                    Email
                  </p>
                  <p className="text-base font-medium" style={{ color: "#1A1A1A" }}>
                    dean@macfarlanepropertygroup.co.za
                  </p>
                </div>
              </a>
            </div>

            <p className="mt-6 text-sm" style={{ color: "#6B7280" }}>
              We typically respond within a few hours during business hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
