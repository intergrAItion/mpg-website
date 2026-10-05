"use client";

import { useState, useRef, useId, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_LIMITS, CONTACT_BODY_BYTES, MAX_PROPERTY_COUNT, challengeOptions, validateContact, type ContactFields, type ContactErrors } from "@/lib/contact-validation";

const initialFields: ContactFields = { name: "", email: "", phone: "", properties: "", location: "", mapsLink: "", challenges: [], message: "" };
const retryMessage = "We couldn’t send your enquiry. Please try again, or call or WhatsApp us on 071 172 0480.";
const inputs = [
  { key: "name", label: "Name", type: "text", autoComplete: "name", required: true, placeholder: "Your full name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email", required: true, placeholder: "your@email.com" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true, placeholder: "e.g. +27 71 172 0480" },
  { key: "properties", label: "Number of Properties", type: "text", autoComplete: "off", required: true, placeholder: "e.g. 3" },
  { key: "location", label: "Property Location", type: "text", autoComplete: "off", required: false, placeholder: "e.g. Sandton, Johannesburg" },
  { key: "mapsLink", label: "Google Maps Link", type: "url", autoComplete: "off", required: false, placeholder: "Paste an HTTPS Google Maps link (optional)" },
] as const;

export default function LeadForm() {
  const id = useId();
  const [formData, setFormData] = useState<ContactFields>(initialFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (submitted) successRef.current?.focus(); }, [submitted]);

  function showError(message: string, fields: ContactErrors = {}) {
    setError(message);
    setFieldErrors(fields);
    const first = Object.keys(fields)[0];
    const control = first && formRef.current?.elements.namedItem(first);
    if (control instanceof HTMLElement) control.focus();
    else errorRef.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setError("");
    setFieldErrors({});
    const validation = validateContact(formData);
    if (!validation.success) { showError(validation.error, validation.fields); return; }
    const payload = JSON.stringify(validation.value);
    if (new TextEncoder().encode(payload).byteLength > CONTACT_BODY_BYTES) {
      showError("Your enquiry is too long. Please shorten it or contact us directly."); return;
    }
    inFlight.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: payload,
      });
      const result = await response.json();
      if (response.ok && result.success === true) setSubmitted(true);
      else showError(typeof result.error === "string" ? result.error : retryMessage, result.fields ?? {});
    } catch { showError(retryMessage); }
    finally { inFlight.current = false; setIsSubmitting(false); }
  }

  return (
    <div className="min-w-0">
      <div ref={errorRef} role="alert" aria-atomic="true" tabIndex={-1} className={error ? "mb-5 rounded-md border border-red-700 p-4 text-sm text-red-800" : ""}>
        {error && <><p>{error}</p><p className="mt-2"><a href="tel:+27711720480" className="contact-link">Call us</a>{" or "}<a href="https://wa.me/27711720480" className="contact-link" target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p></>}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {submitted ? (
          <div ref={successRef} tabIndex={-1} className="text-center py-12 px-6 rounded-lg bg-mpg-cream">
            <h2 className="text-4xl mb-4 text-mpg-green font-cormorant">Thank you!</h2>
            <p className="text-base text-mpg-text-muted">Thank you for your enquiry. We look forward to talking about your property and how MPG can help.</p>
            <p className="mt-4 text-sm text-mpg-text-muted">Prefer to speak now? <a href="tel:+27711720480" className="contact-link">Call</a>{" or "}<a href="https://wa.me/27711720480" className="contact-link" target="_blank" rel="noopener noreferrer">WhatsApp us on 071 172 0480</a>.</p>
          </div>
        ) : <p className="text-sm text-mpg-text-muted mb-2">{isSubmitting ? "Sending your enquiry…" : ""}</p>}
      </div>
      {!submitted && (
        <form ref={formRef} onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inputs.map(input => (
              <div key={input.key} className={input.key === "location" || input.key === "mapsLink" ? "sm:col-span-2 min-w-0" : "min-w-0"}>
                <label htmlFor={`${id}-${input.key}`} className="block text-sm font-medium mb-1.5">
                  {input.label}{input.required && <span className="text-mpg-gold-text" aria-hidden="true"> *</span>}
                </label>
                <input
                  id={`${id}-${input.key}`} name={input.key} type={input.type} required={input.required}
                  autoComplete={input.autoComplete} inputMode={input.key === "properties" ? "numeric" : input.key === "phone" ? "tel" : input.key === "email" ? "email" : undefined}
                  maxLength={input.key === "properties" ? String(MAX_PROPERTY_COUNT).length : CONTACT_LIMITS[input.key]}
                  pattern={input.key === "properties" ? "[0-9]+" : undefined}
                  value={formData[input.key]} onChange={event => setFormData(previous => ({ ...previous, [input.key]: event.target.value }))}
                  aria-invalid={Boolean(fieldErrors[input.key])} aria-describedby={fieldErrors[input.key] ? `${id}-${input.key}-error` : undefined}
                  className="lead-control" placeholder={input.placeholder}
                />
                {fieldErrors[input.key] && <p id={`${id}-${input.key}-error`} className="mt-1 text-sm text-red-800">{fieldErrors[input.key]}</p>}
              </div>
            ))}
          </div>
          <fieldset aria-describedby={fieldErrors.challenges ? `${id}-challenges-error` : undefined}>
            <legend className="block text-sm font-medium mb-2">Current Challenges</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {challengeOptions.map((option, index) => (
                <div key={option} className="flex items-start gap-2.5">
                  <input id={`${id}-challenge-${index}`} name="challenges" value={option} type="checkbox" checked={formData.challenges.includes(option)}
                    onChange={() => setFormData(previous => ({ ...previous, challenges: previous.challenges.includes(option) ? previous.challenges.filter(item => item !== option) : [...previous.challenges, option] }))}
                    className="mt-1 shrink-0 accent-mpg-green" />
                  <label htmlFor={`${id}-challenge-${index}`} className="text-sm text-mpg-text-muted cursor-pointer">{option}</label>
                </div>
              ))}
            </div>
            {fieldErrors.challenges && <p id={`${id}-challenges-error`} className="mt-1 text-sm text-red-800">{fieldErrors.challenges}</p>}
          </fieldset>
          <div>
            <label htmlFor={`${id}-message`} className="block text-sm font-medium mb-1.5">Message</label>
            <textarea id={`${id}-message`} name="message" rows={4} maxLength={CONTACT_LIMITS.message} value={formData.message}
              onChange={event => setFormData(previous => ({ ...previous, message: event.target.value }))}
              aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? `${id}-message-error` : undefined}
              className="lead-control resize-y" placeholder="Tell us more about your situation…" />
            {fieldErrors.message && <p id={`${id}-message-error`} className="mt-1 text-sm text-red-800">{fieldErrors.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 rounded-md font-medium text-sm bg-mpg-gold text-mpg-green hover:bg-mpg-gold-light disabled:cursor-wait disabled:bg-[#b8973d]">
            {isSubmitting ? "Sending…" : "Send Enquiry"}
          </button>
          <p className="text-sm text-center text-mpg-text-muted">Prefer to chat? <a href="https://wa.me/27711720480" target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp us</a>{" or call "}<a href="tel:+27711720480" className="contact-link">071 172 0480</a></p>
          <p className="text-sm text-center text-mpg-text-muted">We use these details to respond to your enquiry. <Link href="/legal#privacy" className="contact-link">Read our privacy policy</Link>.</p>
        </form>
      )}
    </div>
  );
}
