import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SwitchContent from "@/components/sections/SwitchContent";

export const metadata: Metadata = {
  title: "Switch Property Managers in 48 Hours | MacFarlane Property Group",
  description:
    "Unhappy with your current property manager? We handle the entire switch in four steps, typically within 48 hours, with zero disruption to your tenants.",
  openGraph: {
    title: "Switch Property Managers in 48 Hours | MacFarlane Property Group",
    description:
      "Unhappy with your current property manager? We handle the entire switch in four steps, typically within 48 hours, with zero disruption to your tenants.",
    url: "https://www.macfarlanepropertygroup.co.za/switch",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/switch",
  },
};

export default function SwitchPage() {
  return (
    <>
      <PageHero
        heading="Switch Property Managers Without the Hassle"
        subheading="We make the transition seamless, so you can focus on what matters."
      />
      <SwitchContent />
    </>
  );
}
