import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingContent from "@/components/sections/PricingContent";

export const metadata: Metadata = {
  title: "Pricing | MacFarlane Property Group",
  description:
    "Simple, transparent pricing. No hidden fees, no surprises. Our management fees are competitively priced below the industry standard of 10–12%.",
  openGraph: {
    title: "Pricing | MacFarlane Property Group",
    description:
      "Simple, transparent pricing. No hidden fees. Below industry standard management fees.",
    url: "https://macfarlanepropertygroup.co.za/pricing",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        heading="Simple, Transparent Pricing"
        subheading="No hidden fees. No surprises. Just honest property management."
      />
      <PricingContent />
    </>
  );
}
