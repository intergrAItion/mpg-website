import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesContent from "@/components/sections/ServicesContent";
import CTABanner from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Services | MacFarlane Property Group",
  description:
    "Full property management services for commercial buildings, residential buildings, student accommodation, and blocks of flats. Teams in Cape Town, Mbombela, and Johannesburg.",
  openGraph: {
    title: "Services | MacFarlane Property Group",
    description:
      "Full property management services with teams in Cape Town, Mbombela, and Johannesburg.",
    url: "https://macfarlanepropertygroup.co.za/services",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/services",
  },
};

export default function ServicesPage() {
  return (
    <>
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
