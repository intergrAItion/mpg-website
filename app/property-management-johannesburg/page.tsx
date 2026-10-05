import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Johannesburg | MacFarlane Property Group",
  description: "Property management in Johannesburg that brings tenant selection, lease administration and reporting together. Competitive management fees, tailored to your property.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/property-management-johannesburg" },
  openGraph: {
    title: "Property Management in Johannesburg | MacFarlane Property Group", description: "Property management in Johannesburg that brings tenant selection, lease administration and reporting together. Competitive management fees, tailored to your property.", url: "https://www.macfarlanepropertygroup.co.za/property-management-johannesburg",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management in Johannesburg | MacFarlane Property Group", description: "Property management in Johannesburg that brings tenant selection, lease administration and reporting together. Competitive management fees, tailored to your property.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

const citySchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.macfarlanepropertygroup.co.za/#johannesburg",
  name: "MacFarlane Property Group — Johannesburg",
  url: "https://www.macfarlanepropertygroup.co.za/property-management-johannesburg",
  telephone: "+27711720480",
  email: "dean@macfarlanepropertygroup.co.za",
  areaServed: { "@type": "City", name: "Johannesburg" },
  parentOrganization: {
    "@id": "https://www.macfarlanepropertygroup.co.za/#organization",
  },
};

const heading = { fontFamily: "var(--font-cormorant-garamond), serif", color: "#07341C" };
const body = { color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" };

export default function JohannesburgPage() {
  return (
    <>
      <JsonLd data={citySchema} />
      <PageHero
        heading="Property Management in Johannesburg"
        subheading="An organised rental, informed decisions and less administration for you."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Managing a Johannesburg rental means keeping track of tenants, paperwork and
            the decisions that need your attention. MacFarlane Property Group brings those
            responsibilities together, giving you a clearer view of your property and less
            administration to handle yourself. From a single rental to several properties,
            our approach centres on careful tenant selection, organised management and
            communication that helps you stay informed.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            A tenant recommendation should help you make a considered choice. We look at
            supporting documents, affordability and credit history to build a fuller picture
            of an application, then explain our findings for your decision. We also coordinate
            the lease and move-in arrangements, bringing the details together for a smoother
            start to the tenancy.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            During the tenancy, we coordinate tenant communication, maintenance and lease
            administration, supported by inspections and monthly financial reporting. You
            can keep sight of what needs attention without managing each conversation or
            document. Competitive management fees are tailored to your property, and we
            explain the proposed service and costs so you can decide what works for you.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Ready to put your Johannesburg rental on a more organised footing? Share your
            property details in the form below and tell us what you would like from a manager.
            If you are moving from another agency, we coordinate the handover and keep you
            informed as you make the change.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Johannesburg
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            Tenant sourcing and assessment, tenant communication, maintenance coordination,
            lease administration and renewals, move-in and move-out inspections, and monthly
            financial reporting form the core of our management service. We keep tenancy
            records organised and use documented inspections to record the property&apos;s
            condition. It is practical support that connects the application, lease and
            ongoing tenancy, with clear updates to help you make informed decisions.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-8" style={heading}>
            Request a free assessment
          </h2>
          <LeadForm />
        </div>
      </section>

      <CTABanner
        heading="Own a property in Johannesburg?"
        subheading="Get a free, no-obligation assessment and an honest quote for managing it."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
      />

      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center text-sm" style={body}>
          Also serving landlords in{" "}
          <Link href="/property-management-cape-town" className="underline" style={{ color: "#876628" }}>Cape Town</Link>
          {" and "}
          <Link href="/property-management-mbombela" className="underline" style={{ color: "#876628" }}>Mbombela</Link>.
        </div>
      </section>
    </>
  );
}
