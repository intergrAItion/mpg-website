import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PricingContent from "@/components/sections/PricingContent";

export const metadata: Metadata = {
  title: "Property Management Fees & Quotes | Below Industry Standard | MPG",
  description:
    "How much does property management cost in South Africa? Our management fees sit below the 10–12% industry standard. Request a free, no-obligation quote.",
  openGraph: {
    title: "Property Management Fees & Quotes | Below Industry Standard | MPG",
    description:
      "How much does property management cost in South Africa? Our management fees sit below the 10–12% industry standard. Request a free, no-obligation quote.",
    url: "https://www.macfarlanepropertygroup.co.za/quote",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/quote",
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
