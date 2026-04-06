"use client";

import { useState, FormEvent } from "react";

const challengeOptions = [
  "High management fees",
  "Poor communication",
  "Maintenance delays",
  "Tenant issues",
  "Legal / compliance concerns",
];

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    properties: "",
    location: "",
    mapsLink: "",
    challenges: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCheckbox = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(value)
        ? prev.challenges.filter((c) => c !== value)
        : [...prev.challenges, value],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="text-center py-12 px-6 rounded-lg"
        style={{ backgroundColor: "#F8F7F4" }}
      >
        <div
          className="text-4xl mb-4"
          style={{ color: "#C9A84C", fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          Thank you!
        </div>
        <p className="text-base" style={{ color: "#6B7280" }}>
          Your enquiry has been received. We'll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
            Name <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-md border text-sm outline-none focus:ring-2 transition-all"
            style={{
              borderColor: "#e5e7eb",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "#C9A84C";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "#e5e7eb";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
            Email <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all"
            style={{
              borderColor: "#e5e7eb",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "#C9A84C";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "#e5e7eb";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
            Phone <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all"
            style={{
              borderColor: "#e5e7eb",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "#C9A84C";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "#e5e7eb";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
            placeholder="e.g. 071 172 0480"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
            Number of Properties <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <input
            type="text"
            required
            value={formData.properties}
            onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
            className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all"
            style={{
              borderColor: "#e5e7eb",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "#C9A84C";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "#e5e7eb";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
            placeholder="e.g. 3"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
          Property Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all"
          style={{
            borderColor: "#e5e7eb",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "#C9A84C";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "#e5e7eb";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
          placeholder="e.g. Observatory, Cape Town"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
          Google Maps Link
        </label>
        <input
          type="text"
          value={formData.mapsLink}
          onChange={(e) => setFormData({ ...formData, mapsLink: e.target.value })}
          className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all"
          style={{
            borderColor: "#e5e7eb",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "#C9A84C";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "#e5e7eb";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
          placeholder="Paste a Google Maps link (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
          Current Challenges
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {challengeOptions.map((option) => (
            <label key={option} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.challenges.includes(option)}
                onChange={() => handleCheckbox(option)}
                className="rounded"
                style={{ accentColor: "#C9A84C" }}
              />
              <span className="text-sm" style={{ color: "#6B7280" }}>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "#1A1A1A" }}>
          Message
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-md border text-sm outline-none transition-all resize-none"
          style={{
            borderColor: "#e5e7eb",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "#C9A84C";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "#e5e7eb";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
          placeholder="Tell us more about your situation..."
        />
      </div>

      {error && (
        <p className="text-sm" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full py-4 rounded-md font-medium text-sm transition-all duration-200"
        style={{
          backgroundColor: isSubmitting ? "#b8973d" : "#C9A84C",
          color: "#0F1E3C",
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: "0.05em",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>

      <p className="text-sm text-center" style={{ color: "#6B7280" }}>
        Prefer to chat?{" "}
        <a
          href="https://wa.me/27711720480"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors duration-200"
          style={{ color: "#C9A84C" }}
        >
          WhatsApp us
        </a>{" "}
        or call{" "}
        <a
          href="tel:+27711720480"
          className="underline transition-colors duration-200"
          style={{ color: "#C9A84C" }}
        >
          071 172 0480
        </a>
      </p>
    </form>
  );
}
