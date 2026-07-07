import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesContent from "@/components/sections/ServicesContent";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management Services | Tenant Placement, Rent Collection & Maintenance | MPG",
  description:
    "Full-service residential and commercial property management: tenant vetting, rent collection, maintenance coordination, inspections and legal compliance across South Africa.",
  openGraph: {
    title: "Property Management Services | Tenant Placement, Rent Collection & Maintenance | MPG",
    description:
      "Full-service residential and commercial property management: tenant vetting, rent collection, maintenance coordination, inspections and legal compliance across South Africa.",
    url: "https://www.macfarlanepropertygroup.co.za/services",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/services",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Property Management",
  provider: { "@id": "https://www.macfarlanepropertygroup.co.za/#organization" },
  areaServed: [
    { "@type": "City", name: "Cape Town" },
    { "@type": "City", name: "Mbombela" },
    { "@type": "City", name: "Johannesburg" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property Management Services",
    itemListElement: [
      "Tenant Management",
      "Maintenance Coordination",
      "Lease Administration",
      "Property Inspections",
      "Financial Reporting",
      "Legal & Compliance",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero
        heading="Our Services"
        subheading="End-to-end property management for landlords in Cape Town, Mbombela, and Johannesburg."
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
