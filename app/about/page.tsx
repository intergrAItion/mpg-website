import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About | MacFarlane Property Group",
  description:
    "Built on generations of property experience, MacFarlane Property Group offers reliable, cost-effective property management for landlords, with teams in Cape Town, Mbombela, and Johannesburg.",
  openGraph: {
    title: "About | MacFarlane Property Group",
    description:
      "Property management with teams in Cape Town, Mbombela, and Johannesburg. Reliable, transparent, hands-on management.",
    url: "https://macfarlanepropertygroup.co.za/about",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        heading="About MacFarlane Property Group"
        subheading="Built on experience. Driven by results."
      />
      <AboutContent />
    </>
  );
}
