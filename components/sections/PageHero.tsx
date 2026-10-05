"use client";



interface PageHeroProps {
  heading: string;
  subheading: string;
}

export default function PageHero({ heading, subheading }: PageHeroProps) {
  return (
    <section
      className="flex items-center justify-center page-hero px-4 pb-20"
      style={{ minHeight: "40vh", backgroundColor: "#07341C" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "#C9A55A", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          MacFarlane Property Group
        </p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          {heading}
        </h1>
        <p
          className="text-base md:text-lg"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {subheading}
        </p>
      </div>
    </section>
  );
}
