import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingContent from "@/components/sections/PricingContent";

export const metadata: Metadata = {
  title: "Request a Quote | MacFarlane Property Group",
  description:
    "Simple, transparent pricing. No hidden fees, no surprises. Our management fees are competitively priced below the industry standard of 10–12%.",
  openGraph: {
    title: "Request a Quote | MacFarlane Property Group",
    description:
      "Simple, transparent pricing. No hidden fees. Below industry standard management fees.",
    url: "https://macfarlanepropertygroup.co.za/quote",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/quote",
  },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        heading="Request a Quote"
        subheading="No hidden fees. No surprises. Just honest property management."
      />
      <PricingContent />
    </>
  );
}
