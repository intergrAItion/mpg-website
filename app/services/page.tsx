import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesContent from "@/components/sections/ServicesContent";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management Services | Tenants, Leases & Maintenance | MPG",
  description: "Property management in Cape Town, Mbombela and Johannesburg: tenant assessment, lease administration, maintenance coordination, documented inspections and monthly financial reporting.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/services" },
  openGraph: {
    title: "Property Management Services | Tenants, Leases & Maintenance | MPG", description: "Property management in Cape Town, Mbombela and Johannesburg: tenant assessment, lease administration, maintenance coordination, documented inspections and monthly financial reporting.", url: "https://www.macfarlanepropertygroup.co.za/services",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management Services | Tenants, Leases & Maintenance | MPG", description: "Property management in Cape Town, Mbombela and Johannesburg: tenant assessment, lease administration, maintenance coordination, documented inspections and monthly financial reporting.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
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
      "Tenancy & Compliance Administration",
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
        subheading="Bring the everyday administration into one clear management relationship."
        buttonLabel="Get a Free Assessment"
        buttonHref="/contact"
      />
    </>
  );
}
