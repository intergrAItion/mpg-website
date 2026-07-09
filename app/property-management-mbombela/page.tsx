import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management in Mbombela | MacFarlane Property Group",
  description:
    "Property management in Mbombela and the Lowveld — local, hands-on management of residential and commercial rentals, built on generations of family property experience and fees below the industry standard.",
  openGraph: {
    title: "Property Management in Mbombela | MacFarlane Property Group",
    description:
      "Property management in Mbombela and the Lowveld — local, hands-on management of residential and commercial rentals, built on generations of family property experience and fees below the industry standard.",
    url: "https://www.macfarlanepropertygroup.co.za/property-management-mbombela",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/property-management-mbombela",
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
const body = { color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" };

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
            Mbombela sits at the centre of the Lowveld, and it is a market where local knowledge
            and a personal touch still count for a great deal. Landlords here are often managing
            property from a distance, or juggling it alongside a full-time job, and what they need
            is someone on the ground they can actually trust. MacFarlane Property Group runs one
            of its three dedicated teams from Mbombela, managing residential and commercial rentals
            across the region for owners who want their properties handled properly and reported
            back honestly.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            MacFarlane Property Group is built on generations of family involvement in property —
            from Dean MacFarlane&apos;s great-grandfather through to his grandfather, his father, and
            now himself. That inheritance shapes how we work in Mbombela: hands-on, reliable, and
            direct, rather than managed at arm&apos;s length from a distant office. It also means we
            bring modern systems to a traditionally old-fashioned industry — disciplined five-check
            tenant vetting, tight rent collection and arrears management, and every maintenance job
            run on a WhatsApp thread so nothing gets lost. Our management fee sits below the 10–12%
            industry standard.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Whether you own a home you are letting out, a commercial unit, or a small portfolio
            across the Lowveld, you get the same combination: local people who know the area,
            backed by systems that keep everything visible. You get monthly financial reporting, a
            named contact rather than a call-centre queue, and full legal and compliance oversight
            under the Rental Housing Act and POPIA. And if your current manager is letting you down,
            switching to MPG usually takes around 48 hours, with no disruption to your tenants.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={body}>
            Because many Lowveld landlords are managing from elsewhere in the country, trust and
            clear reporting matter more here than almost anywhere. We treat every property as if it
            were our own, send you a straightforward monthly picture of what has come in and what
            has been done, and pick up the phone when you actually need us rather than weeks later.
            It is old-fashioned reliability run on modern systems — the kind of steady, personal
            management that a family-rooted company is well placed to provide, and precisely what
            MacFarlane Property Group was built to bring to a region that has too often been served
            from a distance.
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold gold-underline mb-6" style={heading}>
            What we handle in Mbombela
          </h2>
          <p className="text-base leading-relaxed" style={body}>
            Across Mbombela and the surrounding Lowveld we handle the full spectrum of property
            management: tenant management — sourcing, screening, placement and ongoing
            relationships; maintenance coordination through a vetted contractor panel; lease
            administration and renewals under the Rental Housing Act; move-in and move-out
            inspections; monthly financial reporting with proactive arrears management; and legal
            and compliance oversight covering POPIA and the Rental Housing Act. It is everything
            required to keep a rental performing — handled for you, and reported back clearly.
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
          <Link href="/property-management-cape-town" className="underline" style={{ color: "#C9A55A" }}>Cape Town</Link>
          {" and "}
          <Link href="/property-management-johannesburg" className="underline" style={{ color: "#C9A55A" }}>Johannesburg</Link>.
        </div>
      </section>
    </>
  );
}
