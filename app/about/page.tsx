import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About | MacFarlane Property Group",
  description:
    "Built on over a decade of industry experience, MacFarlane Property Group offers reliable, cost-effective property management for Cape Town landlords.",
  openGraph: {
    title: "About | MacFarlane Property Group",
    description:
      "Built on over a decade of industry experience. Reliable, transparent, hands-on property management.",
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
