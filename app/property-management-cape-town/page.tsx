import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Cape Town | MacFarlane Property Group",
  description: "Property management in Cape Town with careful tenant assessment, clear reporting and less everyday administration. Competitive management fees, tailored to your property.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/property-management-cape-town" },
  openGraph: {
    title: "Property Management in Cape Town | MacFarlane Property Group", description: "Property management in Cape Town with careful tenant assessment, clear reporting and less everyday administration. Competitive management fees, tailored to your property.", url: "https://www.macfarlanepropertygroup.co.za/property-management-cape-town",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management in Cape Town | MacFarlane Property Group", description: "Property management in Cape Town with careful tenant assessment, clear reporting and less everyday administration. Competitive management fees, tailored to your property.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

const citySchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.macfarlanepropertygroup.co.za/#capetown",
  name: "MacFarlane Property Group — Cape Town",
  url: "https://www.macfarlanepropertygroup.co.za/property-management-cape-town",
  telephone: "+27711720480",
  email: "dean@macfarlanepropertygroup.co.za",
  areaServed: { "@type": "City", name: "Cape Town" },
  parentOrganization: {
    "@id": "https://www.macfarlanepropertygroup.co.za/#organization",
  },
};

const heading = { fontFamily: "var(--font-cormorant-garamond), serif", color: "#07341C" };
const body = { color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" };

export default function CapeTownPage() {
  return (
    <>
      <JsonLd data={citySchema} />
      <PageHero
        heading="Property Management in Cape Town"
        subheading="Careful tenant selection, clear communication and more time for you."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Your Cape Town rental should fit into your life without taking over your day.
            MacFarlane Property Group brings care and organisation to the management of your
            property, from finding suitable tenants to keeping you informed throughout the
            tenancy. Whether you let an apartment, a family home or several properties, we
            help you stay involved in the decisions that matter while taking care of the
            everyday administration.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Choosing a tenant deserves considered attention. We review applications and
            supporting information, assess affordability and credit history, and bring our
            findings together in a recommendation for you. With a clearer picture of a
            prospective tenant and support with the lease and move-in arrangements, you can
            approach a new tenancy with greater confidence.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Once the tenancy is under way, clear communication keeps the relationship
            manageable. Tenant enquiries, maintenance coordination, lease administration and
            reporting sit within one organised service, giving you a useful view of your
            rental without having to chase each detail yourself. Our management fees are
            competitive and tailored to your property, with the service and costs explained
            when you enquire.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            If you are considering a change of manager, we coordinate the handover so you can
            switch with confidence. Tell us about your Cape Town property using the enquiry
            form below. We would be pleased to discuss your priorities and how MPG can make
            managing your rental easier.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Cape Town
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            Our service brings together tenant sourcing and assessment, ongoing tenant
            communication, maintenance coordination, lease administration and renewals,
            move-in and move-out inspections, and monthly financial reporting. Documented
            inspections and organised tenancy records help you understand your property&apos;s
            condition and keep the important details in order. From application to move-in
            and ongoing management, we handle the administration and keep you informed.
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
        heading="Own a property in Cape Town?"
        subheading="Get a free, no-obligation assessment and an honest quote for managing it."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
      />

      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center text-sm" style={body}>
          Also serving landlords in{" "}
          <Link href="/property-management-johannesburg" className="underline" style={{ color: "#876628" }}>Johannesburg</Link>
          {" and "}
          <Link href="/property-management-mbombela" className="underline" style={{ color: "#876628" }}>Mbombela</Link>.
        </div>
      </section>
    </>
  );
}
