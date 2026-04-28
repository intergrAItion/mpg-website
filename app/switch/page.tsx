import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SwitchContent from "@/components/sections/SwitchContent";

export const metadata: Metadata = {
  title: "Switch to Us | MacFarlane Property Group",
  description:
    "Tired of your current property manager? We make switching seamless — handling the transition professionally so you can focus on what matters.",
  openGraph: {
    title: "Switch to Us | MacFarlane Property Group",
    description:
      "We make the transition seamless — so you can focus on what matters.",
    url: "https://macfarlanepropertygroup.co.za/switch",
  },
  alternates: {
    canonical: "https://macfarlanepropertygroup.co.za/switch",
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
