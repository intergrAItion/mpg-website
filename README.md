# MacFarlane Property Group — Website

Production-ready marketing website for MacFarlane Property Group (MPG), built with Next.js 16, Tailwind CSS v4, Framer Motion, and Resend.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mpg-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Resend API key:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

Get your API key from [https://resend.com](https://resend.com) — the free tier supports 100 emails/day.

### 4. Add the logo

Place your logo file at:

```
/public/logo.png
```

The logo should be a PNG with a transparent background for best results on the dark navy navbar. If only a white-background version is available, it will still display correctly inside its container.

### 5. Add the hero image

Place your hero image at:

```
/public/hero.jpg
```

A high-resolution photo of a Cape Town property or building works best. The image will be desaturated (grayscale) with a dark navy overlay applied automatically.

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

### 7. Build for production

```bash
npm run build
```

Ensure there are no TypeScript or build errors before deploying.

---

## Deploying to Vercel

### 8. Push to GitHub

Commit your code and push to a GitHub repository.

### 9. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and import your GitHub repository.
2. Vercel will auto-detect Next.js and use the settings in `vercel.json`.

### 10. Add environment variable in Vercel

In your Vercel project settings under **Environment Variables**, add:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx
```

### 11. Set custom domain

In your Vercel project settings under **Domains**, add:

```
macfarlanepropertygroup.co.za
```

Follow Vercel's instructions to update your DNS records (typically adding an A record or CNAME at your domain registrar).

---

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | v4 |
| Framer Motion | 12.x |
| Lucide React | 1.x |
| Resend | 6.x |

## Project Structure

```
/app
  /about/page.tsx         — About page
  /services/page.tsx      — Services page
  /pricing/page.tsx       — Pricing page
  /switch/page.tsx        — Switch to Us page
  /contact/page.tsx       — Contact page
  /legal/page.tsx         — Privacy Policy & Terms
  /api/contact/route.ts   — Contact form API (Resend)
  layout.tsx              — Root layout (Navbar, Footer, WhatsApp button)
  page.tsx                — Home page
  globals.css             — Tailwind + custom CSS variables
/components
  /ui
    Navbar.tsx
    Footer.tsx
    WhatsAppButton.tsx
    LeadForm.tsx
    SectionHeading.tsx
    CTABanner.tsx
  /sections
    HomeHero.tsx
    Pillars.tsx
    ValueProp.tsx
    HowItWorks.tsx
    SwitchSection.tsx
    HomeLeadSection.tsx
    PageHero.tsx
    AboutContent.tsx
    ServicesContent.tsx
    PricingContent.tsx
    SwitchContent.tsx
    ContactContent.tsx
/public
  logo.png    ← PLACEHOLDER — add before deploying
  hero.jpg    ← PLACEHOLDER — add before deploying
```
