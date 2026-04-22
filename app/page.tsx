import type { Metadata } from "next";
import HomeHero from "@/components/sections/HomeHero";
import Pillars from "@/components/sections/Pillars";
import ValueProp from "@/components/sections/ValueProp";
import HowItWorks from "@/components/sections/HowItWorks";
import SwitchSection from "@/components/sections/SwitchSection";
import HomeLeadSection from "@/components/sections/HomeLeadSection";

export const metadata: Metadata = {
  title: "MacFarlane Property Group | South Africa Property Management",
  description:
    "South Africa's modern property management company. Lower fees, faster response, total transparency. Get a free rental assessment today.",
  openGraph: {
    title: "MacFarlane Property Group | South Africa Property Management",
    description:
      "South Africa's modern property management company. Lower fees, faster response, total transparency.",
    url: "https://macfarlanepropertygroup.co.za",
    siteName: "MacFarlane Property Group",
    type: "website",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za",
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
