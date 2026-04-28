import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About | MacFarlane Property Group",
  description:
    "Built on generations of property experience, MacFarlane Property Group offers reliable, cost-effective property management for landlords across South Africa, with teams in Cape Town, Nelspruit, and Johannesburg.",
  openGraph: {
    title: "About | MacFarlane Property Group",
    description:
      "A national property management company with teams in Cape Town, Nelspruit, and Johannesburg. Reliable, transparent, hands-on management.",
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
