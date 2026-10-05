import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingContent from "@/components/sections/PricingContent";

export const metadata: Metadata = {
  title: "Property Management Fees & Quotes | MPG",
  description: "Competitive management fees tailored to your property. Understand the service, ongoing fee and any separate placement or administration costs. Request a free, no-obligation quote.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/quote" },
  openGraph: {
    title: "Property Management Fees & Quotes | MPG", description: "Competitive management fees tailored to your property. Understand the service, ongoing fee and any separate placement or administration costs. Request a free, no-obligation quote.", url: "https://www.macfarlanepropertygroup.co.za/quote",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management Fees & Quotes | MPG", description: "Competitive management fees tailored to your property. Understand the service, ongoing fee and any separate placement or administration costs. Request a free, no-obligation quote.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        heading="Request a Quote"
        subheading="A clear view of the service and costs for your property."
      />
      <PricingContent />
    </>
  );
}
