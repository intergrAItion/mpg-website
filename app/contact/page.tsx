import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Free Rental Assessment | MacFarlane Property Group",
  description: "Talk to MPG about your rental in Cape Town, Mbombela or Johannesburg. Call or WhatsApp 071 172 0480, or send an enquiry for a free assessment.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/contact" },
  openGraph: {
    title: "Contact Us | Free Rental Assessment | MacFarlane Property Group", description: "Talk to MPG about your rental in Cape Town, Mbombela or Johannesburg. Call or WhatsApp 071 172 0480, or send an enquiry for a free assessment.", url: "https://www.macfarlanepropertygroup.co.za/contact",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Contact Us | Free Rental Assessment | MacFarlane Property Group", description: "Talk to MPG about your rental in Cape Town, Mbombela or Johannesburg. Call or WhatsApp 071 172 0480, or send an enquiry for a free assessment.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        heading="Get in Touch"
        subheading="We'd love to hear about your property. Let's talk."
      />
      <ContactContent />
    </>
  );
}
