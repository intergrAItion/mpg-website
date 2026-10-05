import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management FAQ | Fees, Switching & Tenant Vetting | MPG",
  description: "Answers to the questions South African landlords ask most: management fees, switching managers, tenant vetting, maintenance and legal compliance.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/faq" },
  openGraph: {
    title: "Property Management FAQ | Fees, Switching & Tenant Vetting | MPG", description: "Answers to the questions South African landlords ask most: management fees, switching managers, tenant vetting, maintenance and legal compliance.", url: "https://www.macfarlanepropertygroup.co.za/faq",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Property Management FAQ | Fees, Switching & Tenant Vetting | MPG", description: "Answers to the questions South African landlords ask most: management fees, switching managers, tenant vetting, maintenance and legal compliance.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

// Single source of truth: the visible answer prose and the FAQPage schema
// acceptedAnswer text are both built from `a` below, so they cannot drift.
// `extra` holds supplementary in-page links only (not part of the answer prose).
const faqs: { q: string; a: string; extra?: React.ReactNode }[] = [
  {
    q: "What does a property manager actually do?",
    a: `A property manager takes care of the day-to-day running of a rental on your behalf. At MPG, that includes finding and assessing prospective tenants, coordinating maintenance, administering leases and renewals, arranging inspections and providing monthly financial reporting. We bring the details together and keep you informed, so you can give your property the attention it needs without managing every conversation yourself.`,
  },
  {
    q: "What are typical property management fees in South Africa?",
    a: `Fees vary with the property and the level of management you need. MPG offers competitive management fees, tailored to your property. We explain the ongoing management fee and any separate tenant placement or administration fees when you enquire, so you can consider the service with a clear view of the costs. Tell us about your rental and request a quote.`,
  },
  {
    q: "What is included in MPG's management fee?",
    a: `The ongoing management service covers tenant communication, maintenance coordination, lease administration and renewals, move-in and move-out inspections, monthly financial reporting and property updates. It brings the everyday running of your rental into one organised relationship. Tenant placement, onboarding and any separate administration fees are discussed on enquiry, with a quote that explains the service and costs for your property.`,
  },
  {
    q: "How long does it take to switch property managers?",
    a: `The timing depends on your current management arrangements and the handover of the relevant records. We coordinate the handover so you can switch with confidence, keeping you informed as the details are brought together. Tell us about your property and current manager, and we can discuss the next steps and what to expect.`,
  },
  {
    q: "Will switching managers disrupt my tenants?",
    a: `Our aim is a smooth handover with clear communication for you and your tenants. We coordinate the management details, explain how tenants can contact MPG and review outstanding maintenance or tenancy matters as part of the transition. That organised approach helps keep the day-to-day running of your rental on track while you move to a new management relationship.`,
  },
  {
    q: "Which areas does MPG serve?",
    a: `MPG serves landlords in Cape Town, Johannesburg and Mbombela. Explore the city pages below for an overview of our service, or get in touch to discuss your property's location and what you need from a manager. We would be happy to talk through how we can help with your rental.`,
    extra: (
      <p className="text-sm" style={{ color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        Explore local pages:{" "}
        <Link href="/property-management-cape-town" className="underline" style={{ color: "#876628" }}>Cape Town</Link>
        {" · "}
        <Link href="/property-management-johannesburg" className="underline" style={{ color: "#876628" }}>Johannesburg</Link>
        {" · "}
        <Link href="/property-management-mbombela" className="underline" style={{ color: "#876628" }}>Mbombela</Link>
      </p>
    ),
  },
  {
    q: "How does MPG vet tenants?",
    a: `A good tenancy starts with a careful assessment. We look beyond the application form, reviewing supporting documents, affordability and credit history to give you a clearer picture of a prospective tenant. We bring the findings together in a recommendation to help you make an informed decision, then coordinate the lease and move-in arrangements. It’s a considered, hands-on approach that takes the administrative burden off your shoulders.`,
  },
  {
    q: "How are maintenance issues handled?",
    a: `We take the coordination off your hands. Tenants can raise maintenance concerns with MPG, and we help organise contractor communication and follow-up, keeping you informed about work that needs attention. Clear updates make it easier to understand what is happening at your property and make decisions about the next steps, without managing each conversation yourself.`,
  },
  {
    q: "What legal compliance does MPG handle?",
    a: `We support you with organised lease administration, documented inspections and clear reporting, helping you stay informed and keep important tenancy records in order. From preparing a lease to coordinating signing and recording the property's condition at move-in, we bring care and structure to the administration. You have a clearer view of the tenancy and less paperwork to manage yourself.`,
  },
  {
    q: "How do I get started?",
    a: `Get in touch and tell us about your property. You can call or WhatsApp us on 071 172 0480, email dean@macfarlanepropertygroup.co.za, or use the enquiry form. We will discuss what you need, explain how MPG can help and put together a quote for your rental. We look forward to hearing from you.`,
    extra: (
      <Link href="/contact" className="underline" style={{ color: "#876628", fontWeight: 600, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        Get in touch →
      </Link>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        heading="Frequently Asked Questions"
        subheading="Straight answers for South African landlords"
      />
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((f) => (
            <div key={f.q}>
              <h2
                className="text-2xl md:text-3xl font-semibold gold-underline"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#07341C" }}
              >
                {f.q}
              </h2>
              <p
                className="mt-5 text-base leading-relaxed"
                style={{ color: "#5B6470", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {f.a}
              </p>
              {f.extra && <div className="mt-3">{f.extra}</div>}
            </div>
          ))}
        </div>
      </section>
      <CTABanner
        heading="Still have questions?"
        subheading="Get a free, no-obligation rental assessment and an honest quote."
        buttonLabel="Request a Quote"
        buttonHref="/quote"
      />
    </>
  );
}
