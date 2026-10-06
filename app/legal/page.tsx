import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | MacFarlane Property Group",
  description: "Privacy policy and website terms for MacFarlane Property Group. How we use enquiry information and how to contact us about your privacy.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/legal" },
  openGraph: {
    title: "Legal | MacFarlane Property Group", description: "Privacy policy and website terms for MacFarlane Property Group. How we use enquiry information and how to contact us about your privacy.", url: "https://www.macfarlanepropertygroup.co.za/legal",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Legal | MacFarlane Property Group", description: "Privacy policy and website terms for MacFarlane Property Group. How we use enquiry information and how to contact us about your privacy.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default function LegalPage() {
  return (
    <div className="page-hero pb-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold mb-8">Privacy &amp; Website Terms</h1>
        {/* Quick nav */}
        <div className="flex gap-4 mb-12 text-sm">
          <a
            href="#privacy"
            className="underline transition-colors duration-200"
            style={{ color: "#876628" }}
          >
            Privacy Policy
          </a>
          <span aria-hidden="true" style={{ color: "#e5e7eb" }}>|</span>
          <a
            href="#terms"
            className="underline transition-colors duration-200"
            style={{ color: "#876628" }}
          >
            Terms of Service
          </a>
        </div>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
          >
            Privacy Policy
          </h2>
          <p className="text-sm mb-8" style={{ color: "#5B6470" }}>
            Last updated: 5 October 2026
          </p>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "#5B6470" }}>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                1. Introduction
              </h3>
              <p>
                MacFarlane Property Group (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to
                protecting your personal information in accordance with the
                Protection of Personal Information Act, 4 of 2013 (POPIA). This
                Privacy Policy explains what information we collect, how we use
                it, and your rights regarding that information.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                2. Information We Collect
              </h3>
              <p>
                When you submit an enquiry through our website, we may collect
                the following personal information:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property information (location, number of properties)</li>
                <li>Any other details you voluntarily provide in your message</li>
              </ul>
              <p className="mt-2">
                Please avoid including sensitive personal documents in your enquiry.
                Optional Google Analytics stays off until you choose “Accept analytics”.
                Before acceptance or after declining, we do not load its script or send
                analytics requests. The site and enquiry form work without analytics.
              </p>
              <p className="mt-2">
                We save only your versioned cookie choice in local storage and an
                essential preference cookie. Your saved choice is valid for up to
                180 days. If the choice is invalid,
                expired or cannot be saved, analytics stays off. When accepted, analytics
                receives page views without URL query strings or enquiry field values.
              </p>
              <p className="mt-2">
                Use “Cookie preferences” in the footer to change your choice or withdraw
                acceptance. Withdrawal stops future tracking and removes this site’s
                accessible analytics cookies without reloading your enquiry. It cannot
                retract events already sent or requests already in flight. Changes are
                shared with other open tabs where browser support permits.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                3. How We Use Your Information
              </h3>
              <p>
                The personal information you provide is used solely for the
                following purposes:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To respond to your enquiry</li>
                <li>To provide you with information about our services</li>
                <li>
                  To contact you regarding a potential property management
                  arrangement
                </li>
              </ul>
              <p className="mt-2">
                We will not use your information for any other purpose without
                your consent.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                4. Sharing of Information
              </h3>
              <p>
                The enquiry form sends your details to MPG by email using Resend.
                Vercel hosts the website and processes requests needed to serve it.
                Where service coordination requires it, relevant contact details may
                be shared with the people carrying out that work. Please contact
                us if you have questions about how your information is handled.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                5. Data Retention
              </h3>
              <p>
                We retain your personal information for as long as is necessary
                to fulfil the purposes outlined in this policy, or as required
                by law. Once your information is no longer needed, we will
                delete or anonymise it securely.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                6. Your Rights
              </h3>
              <p>Under POPIA, you have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:dean@macfarlanepropertygroup.co.za"
                  className="underline"
                  style={{ color: "#876628" }}
                >
                  dean@macfarlanepropertygroup.co.za
                </a>
                .
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                7. Security
              </h3>
              <p>
                We take reasonable steps to protect your personal information
                from unauthorised access, loss, or misuse. The public website uses HTTPS encryption. Enquiry details are sent
                to MPG by email; please use the published contact details to discuss
                a suitable way to share private documents.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                8. Contact
              </h3>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your personal information, please contact us at{" "}
                <a
                  href="mailto:dean@macfarlanepropertygroup.co.za"
                  className="underline"
                  style={{ color: "#876628" }}
                >
                  dean@macfarlanepropertygroup.co.za
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr style={{ borderColor: "#e5e7eb" }} className="mb-16" />

        {/* Terms of Service */}
        <section id="terms">
          <h2
            className="text-4xl md:text-5xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
          >
            Terms of Service
          </h2>
          <p className="text-sm mb-8" style={{ color: "#5B6470" }}>
            Last updated: 5 October 2026
          </p>

          <div className="space-y-6 text-base leading-relaxed" style={{ color: "#5B6470" }}>
            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                1. Use of This Website
              </h3>
              <p>
                By accessing and using the MacFarlane Property Group website,
                you agree to these Terms of Service. This website is intended
                for informational purposes relating to our property management
                services. You agree not to use this website for any unlawful
                purpose or in a manner that could damage or impair the website
                or its content.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                2. No Guarantee of Results
              </h3>
              <p>
                While we strive to provide excellent service, MacFarlane
                Property Group does not guarantee any specific outcomes or
                results from our property management services. Individual
                results will vary depending on the property, market conditions,
                and other factors outside our control. Any information provided
                on this website is for general guidance only.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                3. Enquiry Form
              </h3>
              <p>
                Submitting an enquiry through our contact form does not
                constitute a binding contract or agreement between you and
                MacFarlane Property Group. An enquiry is simply an expression
                of interest. Any formal agreement for property management
                services will be set out in a separate written contract, signed
                by both parties.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                4. Intellectual Property
              </h3>
              <p>
                All content on this website, including text, images, logos,
                design elements, and branding, is the intellectual property of
                MacFarlane Property Group and is protected by applicable
                copyright and trademark laws. You may not reproduce, distribute,
                or use any content from this website without our prior written
                consent.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                5. Limitation of Liability
              </h3>
              <p>
                MacFarlane Property Group shall not be liable for any direct,
                indirect, incidental, or consequential loss or damage arising
                from your use of, or inability to use, this website or its
                content. This includes but is not limited to loss of data,
                revenue, or business opportunities.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                6. Changes to Terms
              </h3>
              <p>
                We reserve the right to update these Terms of Service at any
                time. Any changes will be posted on this page with an updated
                revision date. Continued use of the website after changes are
                posted constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                7. Governing Law
              </h3>
              <p>
                These Terms of Service are governed by the laws of the Republic
                of South Africa. Any disputes arising from these terms shall be
                subject to the jurisdiction of the courts of South Africa.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif", color: "#1A1A1A" }}
              >
                8. Contact
              </h3>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:dean@macfarlanepropertygroup.co.za"
                  className="underline"
                  style={{ color: "#876628" }}
                >
                  dean@macfarlanepropertygroup.co.za
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
