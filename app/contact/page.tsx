import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact | MacFarlane Property Group",
  description:
    "Get in touch with MacFarlane Property Group. Phone, WhatsApp, or email — we're happy to discuss your property management needs.",
  openGraph: {
    title: "Contact | MacFarlane Property Group",
    description:
      "Get in touch. We'd love to hear about your property. Let's talk.",
    url: "https://macfarlanepropertygroup.co.za/contact",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        heading="Get in Touch"
        subheading="We'd love to hear about your property. Let's talk."
      />
      <ContactContent />
    </>
  );
}
