import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";

const GA_MEASUREMENT_ID = "G-1T14DW2GGH";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07341C",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.macfarlanepropertygroup.co.za"),
  title: "MacFarlane Property Group",
  description:
    "Tech-driven property management in Cape Town, Mbombela, and Johannesburg. Lower fees, faster response, total transparency.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon-no-bg.png",
    apple: "/favicon-no-bg.png",
  },
  openGraph: {
    title: "MacFarlane Property Group",
    description:
      "Tech-driven property management in Cape Town, Mbombela, and Johannesburg. Lower fees, faster response, total transparency.",
    url: "https://www.macfarlanepropertygroup.co.za",
    siteName: "MacFarlane Property Group",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "MacFarlane Property Group",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MacFarlane Property Group",
    description:
      "Tech-driven property management in Cape Town, Mbombela, and Johannesburg. Lower fees, faster response, total transparency.",
    images: ["/og-card.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.macfarlanepropertygroup.co.za/#organization",
  name: "MacFarlane Property Group",
  url: "https://www.macfarlanepropertygroup.co.za",
  logo: "https://www.macfarlanepropertygroup.co.za/logo-green.png",
  description:
    "Tech-driven property management in Cape Town, Mbombela, and Johannesburg. Lower fees, faster response, total transparency.",
  telephone: "+27711720480",
  email: "dean@macfarlanepropertygroup.co.za",
  founder: { "@type": "Person", name: "Dean MacFarlane" },
  areaServed: [
    { "@type": "City", name: "Cape Town" },
    { "@type": "City", name: "Mbombela" },
    { "@type": "City", name: "Johannesburg" },
  ],
  // TODO: add LinkedIn/Facebook URLs
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27711720480",
    email: "dean@macfarlanepropertygroup.co.za",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        <JsonLd data={organizationSchema} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
