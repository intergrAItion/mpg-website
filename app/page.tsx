import type { Metadata } from "next";
import HomeHero from "@/components/sections/HomeHero";
import Pillars from "@/components/sections/Pillars";
import ValueProp from "@/components/sections/ValueProp";
import HowItWorks from "@/components/sections/HowItWorks";
import SwitchSection from "@/components/sections/SwitchSection";
import HomeLeadSection from "@/components/sections/HomeLeadSection";

export const metadata: Metadata = {
  title: "Property Management in Cape Town, Mbombela & Johannesburg | MacFarlane Property Group",
  description: "Property management for landlords in Cape Town, Mbombela and Johannesburg. Careful tenant assessment, coordinated maintenance and clear reporting. Request a quote for your rental.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za" },
  openGraph: {
    title: "Property Management in Cape Town, Mbombela & Johannesburg | MacFarlane Property Group", description: "Property management for landlords in Cape Town, Mbombela and Johannesburg. Careful tenant assessment, coordinated maintenance and clear reporting. Request a quote for your rental.", url: "https://www.macfarlanepropertygroup.co.za",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management in Cape Town, Mbombela & Johannesburg | MacFarlane Property Group", description: "Property management for landlords in Cape Town, Mbombela and Johannesburg. Careful tenant assessment, coordinated maintenance and clear reporting. Request a quote for your rental.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <Pillars />
      <ValueProp />
      <HowItWorks />
      <SwitchSection />
      <HomeLeadSection />
    </>
  );
}
