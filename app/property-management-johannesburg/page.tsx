import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Johannesburg | MacFarlane Property Group",
  description:
    "Property management in Johannesburg for landlords with single units, sectional-title blocks and multi-unit buildings — tenant vetting, rent collection, maintenance and compliance, below industry-standard fees.",
  openGraph: {
    title: "Property Management in Johannesburg | MacFarlane Property Group",
    description:
      "Property management in Johannesburg for landlords with single units, sectional-title blocks and multi-unit buildings — tenant vetting, rent collection, maintenance and compliance, below industry-standard fees.",
    url: "https://www.macfarlanepropertygroup.co.za/property-management-johannesburg",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/property-management-johannesburg",
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
const body = { color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" };

export default function JohannesburgPage() {
  return (
    <>
      <JsonLd data={citySchema} />
      <PageHero
        heading="Property Management in Johannesburg"
        subheading="Management built for Johannesburg landlords — from single flats to multi-unit buildings."
      />

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Johannesburg is South Africa&apos;s largest rental market, and it is also one of its
            most varied. A landlord here might own a single apartment, a unit in a sectional-title
            block, or a whole multi-unit building — and each of those needs managing differently.
            MacFarlane Property Group runs one of its three dedicated teams for Johannesburg,
            handling residential and commercial rentals across the city for owners who want their
            properties run properly without doing it themselves.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Scale is where most agencies quietly fall down. The more units you own, the more
            small failures — a missed maintenance ticket, a slow reference check, an unexplained
            deduction — compound into real cost. We counter that with discipline: tenants are
            placed through the same rigorous five-check vetting on every application; rent
            collection and arrears are tracked tightly; and every maintenance job runs on a
            WhatsApp thread with a named contact, from first request to completion and a
            satisfaction check. Our management fee sits below the 10–12% industry standard,
            which matters more, not less, as your portfolio grows.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            For owners of sectional-title units and multi-unit buildings, clear monthly reporting
            is not a nicety — it is how you keep control of an asset you do not see every day. You
            get monthly financial statements, proactive updates on what is outstanding, and legal
            and compliance oversight under the Rental Housing Act and POPIA. And if your current
            Johannesburg manager is not delivering, switching to MPG usually takes around 48 hours
            with no disruption to your tenants and no change to their leases, rent or deposits.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Johannesburg landlords also operate in a fast-moving market where good tenants have
            options, so speed and professionalism at placement make a real difference. We keep the
            process tight from first enquiry to signed lease, present each property well, and make
            sure the tenant who moves in is the one who passed every check — not simply the one who
            applied first. For owners of sectional-title units and multi-unit buildings, that same
            consistency applied to every unit is what protects the value of the whole asset. It is
            unglamorous, repeatable discipline: the same vetting, the same reporting and the same
            responsiveness on unit one as on unit fifty, month after month.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Johannesburg
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            Across Johannesburg we handle the full spectrum of property management: tenant
            management — sourcing, screening, placement and ongoing relationships; maintenance
            coordination through a vetted contractor panel; lease administration and renewals
            under the Rental Housing Act; move-in and move-out inspections; monthly financial
            reporting with proactive arrears management; and legal and compliance oversight
            covering POPIA and the Rental Housing Act. Whether it is one unit or a full building,
            it is everything required to keep a rental performing — handled for you, and reported
            back clearly.
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
          <Link href="/property-management-cape-town" className="underline" style={{ color: "#C9A55A" }}>Cape Town</Link>
          {" and "}
          <Link href="/property-management-mbombela" className="underline" style={{ color: "#C9A55A" }}>Mbombela</Link>.
        </div>
      </section>
    </>
  );
}
