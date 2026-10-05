import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Mbombela | MacFarlane Property Group",
  description: "Property management for Mbombela and Lowveld landlords, with considered tenant assessment and organised tenancy support. Competitive management fees, tailored to your property.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/property-management-mbombela" },
  openGraph: {
    title: "Property Management in Mbombela | MacFarlane Property Group", description: "Property management for Mbombela and Lowveld landlords, with considered tenant assessment and organised tenancy support. Competitive management fees, tailored to your property.", url: "https://www.macfarlanepropertygroup.co.za/property-management-mbombela",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management in Mbombela | MacFarlane Property Group", description: "Property management for Mbombela and Lowveld landlords, with considered tenant assessment and organised tenancy support. Competitive management fees, tailored to your property.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

const citySchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.macfarlanepropertygroup.co.za/#mbombela",
  name: "MacFarlane Property Group — Mbombela",
  url: "https://www.macfarlanepropertygroup.co.za/property-management-mbombela",
  telephone: "+27711720480",
  email: "dean@macfarlanepropertygroup.co.za",
  areaServed: { "@type": "City", name: "Mbombela" },
  parentOrganization: {
    "@id": "https://www.macfarlanepropertygroup.co.za/#organization",
  },
};

const heading = { fontFamily: "var(--font-cormorant-garamond), serif", color: "#07341C" };
const body = { color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" };

export default function MbombelaPage() {
  return (
    <>
      <JsonLd data={citySchema} />
      <PageHero
        heading="Property Management in Mbombela"
        subheading="Personal, hands-on property management for landlords across Mbombela and the Lowveld."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Letting out a property in Mbombela should leave room for the other things that
            matter to you. MacFarlane Property Group offers hands-on rental management for
            landlords in Mbombela and the Lowveld, bringing care to tenant selection and
            structure to the everyday details. If you are balancing a rental with work,
            family or other commitments, we help take the administration off your shoulders
            while keeping you involved in important decisions.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Feeling confident about a prospective tenant begins with understanding the
            application. Our assessment draws together supporting documents, affordability
            and credit history into a recommendation for you to consider. We then coordinate
            the lease and move-in arrangements, helping turn a promising application into
            an organised start to the tenancy.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Good management continues beyond the key handover. Tenant communication,
            maintenance coordination, inspections and monthly financial reporting help you
            keep a clear picture of your rental. We manage the paperwork and follow-up so
            you can focus on your priorities. Our competitive management fees are tailored
            to your property, with a clear explanation of the service and costs on enquiry.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Tell us about your Mbombela or Lowveld property and the support you are looking
            for. Use the enquiry form below to start a conversation about how MPG can help.
            If you already have a manager, we can coordinate the handover so you can make
            the change with confidence.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Mbombela
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            For landlords in Mbombela and the surrounding Lowveld, our service includes
            tenant sourcing and assessment, ongoing tenant communication, maintenance
            coordination, lease administration and renewals, move-in and move-out inspections,
            and monthly financial reporting. We bring the tenancy records together and
            document the property&apos;s condition at inspections, helping you keep the details
            in order with less day-to-day administration.
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
        heading="Own a property in Mbombela?"
        subheading="Get a free, no-obligation assessment and an honest quote for managing it."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
      />

      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center text-sm" style={body}>
          Also serving landlords in{" "}
          <Link href="/property-management-cape-town" className="underline" style={{ color: "#876628" }}>Cape Town</Link>
          {" and "}
          <Link href="/property-management-johannesburg" className="underline" style={{ color: "#876628" }}>Johannesburg</Link>.
        </div>
      </section>
    </>
  );
}
