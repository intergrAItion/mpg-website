import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management FAQ | Fees, Switching & Tenant Vetting | MPG",
  description:
    "Answers to the questions South African landlords ask most: management fees, switching managers, tenant vetting, maintenance and legal compliance.",
  openGraph: {
    title: "Property Management FAQ | Fees, Switching & Tenant Vetting | MPG",
    description:
      "Answers to the questions South African landlords ask most: management fees, switching managers, tenant vetting, maintenance and legal compliance.",
    url: "https://www.macfarlanepropertygroup.co.za/faq",
  },
  alternates: {
    canonical: "https://www.macfarlanepropertygroup.co.za/faq",
  },
};

// Single source of truth: the visible answer prose and the FAQPage schema
// acceptedAnswer text are both built from `a` below, so they cannot drift.
// `extra` holds supplementary in-page links only (not part of the answer prose).
const faqs: { q: string; a: string; extra?: React.ReactNode }[] = [
  {
    q: "What does a property manager actually do?",
    a: `A property manager runs the day-to-day of a rental on the landlord's behalf. At MacFarlane Property Group that means the full spectrum: sourcing and placing tenants, communicating with them, logging maintenance and coordinating contractors, administering leases and renewals, carrying out move-in and move-out inspections, tracking rent and reporting on it monthly, and keeping the property compliant with the Rental Housing Act and POPIA. The point is simple — you own the investment, we handle the management, and you get clear reporting and total transparency without the day-to-day workload.`,
  },
  {
    q: "What are typical property management fees in South Africa?",
    a: `The industry standard sits at roughly 10–12% of monthly rent. That figure isn't a law — it's a habit, and it has gone largely unchallenged for years. MacFarlane Property Group deliberately prices below that standard, because tech-enabled management lowers our cost of doing the work and we pass that back to you as more of your rental income retained. Tenant placement and onboarding are quoted to your specific needs, but the management fee itself is competitively below the 10–12% norm. Request a quote and we'll give you the honest number for your property.`,
  },
  {
    q: "What is included in MPG's management fee?",
    a: `Your monthly management fee covers tenant communication and relationship management, maintenance logging and contractor coordination, lease administration and renewals, move-in and move-out inspections, monthly financial reporting, legal and compliance oversight, and regular property updates and reporting — in short, the running of your rental end to end. Tenant placement and onboarding fees are handled separately and discussed on enquiry, based on your specific needs, so you only pay for what your property actually requires.`,
  },
  {
    q: "How long does it take to switch property managers?",
    a: `Most of our transitions complete inside 48 hours. The process is four steps: you sign a short e-signed appointment letter; we notify your existing manager and send the formal handover request, copying you in so you don't have to make the awkward call; funds and documents — deposits, prepaid rent, leases, compliance certificates and contractor warranties — transfer and are audited; and then you go live with MPG. The 48-hour clock runs from your signature to going live, and most of that time is your old manager's response window, not ours.`,
  },
  {
    q: "Will switching managers disrupt my tenants?",
    a: `No — done properly, a switch is an administrative event, not a drama. Your tenants experience exactly one thing: a friendly message on the day letting them know their day-to-day contact is now MPG, with the new details. Their lease, rental amount and deposit balance stay exactly the same. Their debit order is migrated to our trust account with no action required from them, and any maintenance already in progress is picked up where it was left. In our experience the most common tenant reply is simply "OK, thanks" — which is exactly the target.`,
  },
  {
    q: "Which areas does MPG serve?",
    a: `We have dedicated teams based in Cape Town, Mbombela, and Johannesburg, which lets us manage landlords and properties across all three regions rather than at arm's length. Each of these areas has its own local page, and if your property sits in or around one of them, we can almost certainly help. If you're not sure whether we cover your area, get in touch and we'll tell you honestly.`,
    extra: (
      <p className="text-sm" style={{ color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        Explore local pages:{" "}
        <Link href="/property-management-cape-town" className="underline" style={{ color: "#C9A55A" }}>Cape Town</Link>
        {" · "}
        <Link href="/property-management-johannesburg" className="underline" style={{ color: "#C9A55A" }}>Johannesburg</Link>
        {" · "}
        <Link href="/property-management-mbombela" className="underline" style={{ color: "#C9A55A" }}>Mbombela</Link>
      </p>
    ),
  },
  {
    q: "How does MPG vet tenants?",
    a: `Thorough vetting isn't complicated — it's a matter of discipline, and most agencies skip half of it. We run five checks on every applicant: a full credit report, not just an affordability score; three months of bank statements, watching for reversed debit orders, which are the strongest predictor of late rent; employment verification by phone; two landlord references, including at least one we source ourselves rather than the one the applicant hands us; and a short face-to-face site meeting. Together they take about five minutes per applicant and catch the overwhelming majority of problem tenants before they sign.`,
  },
  {
    q: "How are maintenance issues handled?",
    a: `Two things make maintenance work: the right contractors and the right communication. We run a curated contractor panel — vetted on registration, insurance, references and a run of trial jobs, then re-graded every quarter on callback rate, quote accuracy, response time and tenant satisfaction, with underperformers pruned. Every maintenance job then runs on a WhatsApp thread: the request is acknowledged, the contractor booking confirmed, completion noted, and a one-line satisfaction check sent. Tenants always know where the conversation is, and issues get resolved rather than sitting unattended.`,
  },
  {
    q: "What legal compliance does MPG handle?",
    a: `Compliance is built into how we manage, not bolted on. We handle lease administration and oversight under the Rental Housing Act, and we manage personal information in line with POPIA. Our background spans the full compliance picture — lease creation, inspections, health and safety, and legal adherence — and part of why the company was founded was the belief that tech-enabled management can close the compliance gaps older, manual approaches leave open. The result is fewer gaps, better records, and less legal exposure for you as the landlord.`,
  },
  {
    q: "How do I get started?",
    a: `The first step is a free rental assessment — no cost and no obligation. Tell us about your property by phone or WhatsApp on 071 172 0480, by email at dean@macfarlanepropertygroup.co.za, or through the enquiry form, and we'll come back to you, usually within a few hours. We'll look at your current setup, explain how we would manage it, and give you an honest quote. If you'd like to go ahead, we handle the rest.`,
    extra: (
      <Link href="/contact" className="underline" style={{ color: "#C9A55A", fontWeight: 600, fontFamily: "var(--font-dm-sans), sans-serif" }}>
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
                style={{ color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}
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
