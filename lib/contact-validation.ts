// Shared by the browser form and the server. No provider configuration belongs here.
export const CONTACT_LIMITS = {
  name: 120, email: 254, phone: 40, location: 200, mapsLink: 2048, message: 5000,
} as const;
export const CONTACT_BODY_BYTES = 16 * 1024;
// An input bound, not a limit on which landlords MPG can help.
export const MAX_PROPERTY_COUNT = 1_000_000;
export const challengeOptions = [
  "High management fees", "Poor communication", "Maintenance delays", "Tenant issues", "Legal / compliance concerns",
] as const;
export interface ContactFields {
  name: string; email: string; phone: string; properties: string;
  location: string; mapsLink: string; challenges: string[]; message: string;
}
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export type ContactValidation =
  | { success: true; value: ContactFields }
  | { success: false; error: string; fields: ContactErrors };
const singleLineControls = /[\u0000-\u001f\u007f]/;
const messageControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export function isGoogleMapsUrl(value: string): boolean {
  if (singleLineControls.test(value) || value.includes("\\")) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return false;
    const host = url.hostname;
    if (["google.com", "www.google.com", "google.co.za", "www.google.co.za"].includes(host)) {
      return url.pathname === "/maps" || url.pathname.startsWith("/maps/");
    }
    if (["maps.google.com", "maps.google.co.za"].includes(host)) {
      return url.pathname === "/" || url.pathname === "/maps" || url.pathname.startsWith("/maps/");
    }
    if (host === "maps.app.goo.gl") return /^\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);
    return host === "goo.gl" && /^\/maps\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);
  } catch { return false; }
}
function usableEmail(value: string): boolean {
  const parts = value.split("@");
  if (parts.length !== 2 || parts[0].length > 64) return false;
  const [local, domain] = parts;
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  const labels = domain.split(".");
  return labels.length >= 2 && labels.every(label =>
    label.length <= 63 && /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label)
  );
}
export function validateContact(input: unknown): ContactValidation {
  if (!input || typeof input !== "object" || Array.isArray(input) || Object.getPrototypeOf(input) !== Object.prototype) {
    return { success: false, error: "Please send a valid enquiry form.", fields: {} };
  }
  const body = input as Record<string, unknown>;
  const allowed = [...Object.keys(CONTACT_LIMITS), "properties", "challenges"];
  if (Object.keys(body).some(key => !allowed.includes(key))) {
    return { success: false, error: "Please send only the enquiry form fields.", fields: {} };
  }
  const fields: ContactErrors = {};
  const value: ContactFields = { name: "", email: "", phone: "", properties: "", location: "", mapsLink: "", challenges: [], message: "" };
  for (const key of Object.keys(CONTACT_LIMITS) as (keyof typeof CONTACT_LIMITS)[]) {
    const required = ["name", "email", "phone"].includes(key);
    const raw = body[key];
    if (raw === undefined && !required) continue;
    if (typeof raw !== "string") { fields[key] = "Please enter text in this field."; continue; }
    value[key] = raw.trim();
    if (required && !value[key]) fields[key] = "Please complete this field.";
    else if (raw.length > CONTACT_LIMITS[key]) fields[key] = `Please use at most ${CONTACT_LIMITS[key]} characters.`;
    else if ((key === "message" ? messageControls : singleLineControls).test(raw)) fields[key] = "Please remove unsupported control characters.";
  }
  if (!fields.email && !usableEmail(value.email)) fields.email = "Please enter a valid email address.";
  const phoneDigits = value.phone.replace(/\D/g, "");
  if (!fields.phone && (!/^\+?[0-9 ()\-.]+$/.test(value.phone) || phoneDigits.length < 7 || phoneDigits.length > 15)) {
    fields.phone = "Please enter a phone number with 7–15 digits, including the country code if needed.";
  }
  if (typeof body.properties !== "string" || !/^[0-9]+$/.test(body.properties.trim())) {
    fields.properties = "Please enter a positive whole number of properties.";
  } else {
    const count = Number(body.properties.trim());
    if (!Number.isSafeInteger(count) || count < 1 || count > MAX_PROPERTY_COUNT) fields.properties = "Please enter a positive whole number up to 1,000,000, or contact us directly.";
    else value.properties = String(count);
  }
  if (value.mapsLink && !fields.mapsLink && !isGoogleMapsUrl(value.mapsLink)) fields.mapsLink = "Please use an HTTPS Google Maps link, or leave this optional field blank.";
  if (body.challenges !== undefined) {
    const challenges = body.challenges;
    if (!Array.isArray(challenges) || challenges.length > challengeOptions.length || challenges.some(item => typeof item !== "string" || !challengeOptions.some(option => option === item)) || new Set(challenges).size !== challenges.length) {
      fields.challenges = "Please choose each listed challenge at most once.";
    } else value.challenges = challenges;
  }
  return Object.keys(fields).length
    ? { success: false, error: "Please check the highlighted fields.", fields }
    : { success: true, value };
}
