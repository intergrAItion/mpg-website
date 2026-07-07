import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Free Rental Assessment | MacFarlane Property Group",
  description:
    "Get a free rental assessment for your property. Call or WhatsApp 071 172 0480, or send an enquiry — we respond within a few hours.",
  openGraph: {
    title: "Contact Us | Free Rental Assessment | MacFarlane Property Group",
    description:
      "Get a free rental assessment for your property. Call or WhatsApp 071 172 0480, or send an enquiry — we respond within a few hours.",
    url: "https://www.macfarlanepropertygroup.co.za/contact",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/contact",
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
