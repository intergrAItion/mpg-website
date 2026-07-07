import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About MacFarlane Property Group | Generations of Property Experience",
  description:
    "Founded by Dean MacFarlane on generations of family property experience. Modern, transparent property management for South African landlords.",
  openGraph: {
    title: "About MacFarlane Property Group | Generations of Property Experience",
    description:
      "Founded by Dean MacFarlane on generations of family property experience. Modern, transparent property management for South African landlords.",
    url: "https://www.macfarlanepropertygroup.co.za/about",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/about",
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
