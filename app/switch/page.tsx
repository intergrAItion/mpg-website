import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import SwitchContent from "@/components/sections/SwitchContent";

export const metadata: Metadata = {
  title: "Switch Property Managers with Confidence | MPG",
  description: "Ready for a new property manager? MPG coordinates the handover and tenant communication, helping you move to a clearer management relationship. Tell us about your rental.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/switch" },
  openGraph: {
    title: "Switch Property Managers with Confidence | MPG", description: "Ready for a new property manager? MPG coordinates the handover and tenant communication, helping you move to a clearer management relationship. Tell us about your rental.", url: "https://www.macfarlanepropertygroup.co.za/switch",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Switch Property Managers with Confidence | MPG", description: "Ready for a new property manager? MPG coordinates the handover and tenant communication, helping you move to a clearer management relationship. Tell us about your rental.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function SwitchPage() {
  return (
    <>
      <PageHero
        heading="Switch Property Managers Without the Hassle"
        subheading="An organised handover, with clear communication along the way."
      />
      <SwitchContent />
    </>
  );
}
