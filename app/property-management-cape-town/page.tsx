import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Cape Town | MacFarlane Property Group",
  description:
    "Property management in Cape Town for residential and commercial landlords — tenant vetting, rent collection, maintenance and compliance, with fees below the 10–12% industry standard.",
  openGraph: {
    title: "Property Management in Cape Town | MacFarlane Property Group",
    description:
      "Property management in Cape Town for residential and commercial landlords — tenant vetting, rent collection, maintenance and compliance, with fees below the 10–12% industry standard.",
    url: "https://www.macfarlanepropertygroup.co.za/property-management-cape-town",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/property-management-cape-town",
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
const body = { color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" };

export default function CapeTownPage() {
  return (
    <>
      <JsonLd data={citySchema} />
      <PageHero
        heading="Property Management in Cape Town"
        subheading="Local, hands-on management for Cape Town landlords — lower fees, faster response, total transparency."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Cape Town is one of South Africa&apos;s most active rental markets, and for
            landlords that is both an opportunity and a responsibility. Strong, sustained
            tenant demand means a well-presented property rarely sits empty for long — but it
            also means the gap between a good tenant and a costly one comes down to how
            carefully applicants are screened and how quickly issues are handled. MacFarlane
            Property Group runs one of its three dedicated teams from Cape Town, managing
            residential and commercial rentals across the city for landlords who would rather
            own the investment than run it day to day.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            What Cape Town landlords tell us they want is simple: fewer voids, faster answers,
            and honest numbers. We place tenants through a disciplined five-check vetting
            process — full credit report, three months of bank statements, phone-verified
            employment, independent landlord references, and a face-to-face meeting — then keep
            rent collection and arrears management tight, and run every maintenance job on a
            WhatsApp thread so nothing sits unattended. Our management fee sits below the 10–12%
            industry standard, because tech-enabled management should cost less, not more, and
            we pass that saving back to you.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Whether you own a single flat or a growing Cape Town portfolio, the model is the
            same: local people who understand the market, backed by systems that keep everything
            visible. You get monthly financial reporting, proactive communication, and a named
            contact rather than a call-centre queue. And if you are already with another manager
            and it is not working, switching to MPG typically takes about 48 hours, with your
            tenants&apos; leases, deposits and rent amounts entirely unchanged.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Cape Town landlords also value responsiveness, and that is where the model earns its
            keep. Because we work from a dedicated local base rather than a distant head office, we
            can move quickly on viewings, inspections and maintenance callouts — and because every
            interaction is logged and reported, you are never left guessing what has actually
            happened on your property. That combination matters whether you let a compact city
            apartment or a larger family home: shorter vacancies, better-kept properties, faster
            answers when something needs attention, and a management relationship you can genuinely
            see into. For owners who have grown tired of chasing an agent for updates that never
            arrive, that visibility alone is often the reason they switch.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Cape Town
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            Across Cape Town we handle the full spectrum of property management: tenant
            management — sourcing, screening, placement and ongoing relationships; maintenance
            coordination through a vetted contractor panel; lease administration and renewals
            under the Rental Housing Act; move-in and move-out inspections; monthly financial
            reporting with proactive arrears management; and legal and compliance oversight
            covering POPIA and the Rental Housing Act. It is everything required to keep a
            rental performing — handled for you, and reported back clearly.
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
          <Link href="/property-management-johannesburg" className="underline" style={{ color: "#C9A55A" }}>Johannesburg</Link>
          {" and "}
          <Link href="/property-management-mbombela" className="underline" style={{ color: "#C9A55A" }}>Mbombela</Link>.
        </div>
      </section>
    </>
  );
}
