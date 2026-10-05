import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About MPG | Hands-On Property Management",
  description: "Meet MacFarlane Property Group, founded by Dean MacFarlane. Hands-on rental management and clear communication for landlords in Cape Town, Mbombela and Johannesburg.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/about" },
  openGraph: {
    title: "About MPG | Hands-On Property Management", description: "Meet MacFarlane Property Group, founded by Dean MacFarlane. Hands-on rental management and clear communication for landlords in Cape Town, Mbombela and Johannesburg.", url: "https://www.macfarlanepropertygroup.co.za/about",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "About MPG | Hands-On Property Management", description: "Meet MacFarlane Property Group, founded by Dean MacFarlane. Hands-on rental management and clear communication for landlords in Cape Town, Mbombela and Johannesburg.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        heading="About MacFarlane Property Group"
        subheading="Hands-on management. Clear communication."
      />
      <AboutContent />
    </>
  );
}
