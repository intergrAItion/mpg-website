import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesContent from "@/components/sections/ServicesContent";
import CTABanner from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Services | MacFarlane Property Group",
  description:
    "End-to-end property management for Cape Town landlords. Tenant management, maintenance, lease administration, inspections, financial reporting, and legal compliance.",
  openGraph: {
    title: "Services | MacFarlane Property Group",
    description:
      "End-to-end property management for Cape Town landlords.",
    url: "https://macfarlanepropertygroup.co.za/services",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        heading="Our Services"
        subheading="End-to-end property management for Cape Town landlords."
      />
      <ServicesContent />
      <CTABanner
        heading="Ready to hand over the keys?"
        subheading="Let us handle the management while you enjoy the returns."
        buttonLabel="Get a Free Assessment"
        buttonHref="/contact"
      />
    </>
  );
}
