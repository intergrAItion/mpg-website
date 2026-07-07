import type { Metadata } from "next";
import HomeHero from "@/components/sections/HomeHero";
import Pillars from "@/components/sections/Pillars";
import ValueProp from "@/components/sections/ValueProp";
import HowItWorks from "@/components/sections/HowItWorks";
import SwitchSection from "@/components/sections/SwitchSection";
import HomeLeadSection from "@/components/sections/HomeLeadSection";

export const metadata: Metadata = {
  title: "Property Management in Cape Town, Mbombela & Johannesburg | MacFarlane Property Group",
  description:
    "Tech-driven property management for landlords. Fees below the 10–12% industry standard, faster maintenance response, and full Rental Housing Act compliance.",
  openGraph: {
    title: "Property Management in Cape Town, Mbombela & Johannesburg | MacFarlane Property Group",
    description:
      "Tech-driven property management for landlords. Fees below the 10–12% industry standard, faster maintenance response, and full Rental Housing Act compliance.",
    url: "https://www.macfarlanepropertygroup.co.za",
    siteName: "MacFarlane Property Group",
    type: "website",
  },
  alternates: {
    canonical: "/",
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
