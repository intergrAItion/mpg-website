import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_BODY_BYTES, validateContact, type ContactFields } from "@/lib/contact-validation";

const canonicalOrigins = new Set([
  "https://www.macfarlanepropertygroup.co.za", "https://macfarlanepropertygroup.co.za",
]);
const publicContacts = {
  phone: "tel:+27711720480", whatsapp: "https://wa.me/27711720480", email: "mailto:dean@macfarlanepropertygroup.co.za",
};
const deliveryError = "We couldn’t send your enquiry. Please try again, or call or WhatsApp us on 071 172 0480.";
function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false; // Only the website's browser form is supported.
  if (canonicalOrigins.has(origin)) return true;
  if (process.env.NODE_ENV !== "development") return false;
  return ["http://localhost:3000", "http://127.0.0.1:3000"].includes(origin);
}
function supportedMediaType(value: string | null): boolean {
  // Only JSON, optionally explicitly encoded as UTF-8. No unrelated parameters.
  return value !== null && /^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?\s*$/i.test(value.trim());
}
class BodyError extends Error {
  constructor(readonly status: 400 | 413) { super("Invalid request body"); }
}
async function readBoundedJson(request: Request): Promise<unknown> {
  if (!request.body) throw new BodyError(400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > CONTACT_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new BodyError(413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch (error) {
    if (error instanceof BodyError) throw error;
    throw new BodyError(400);
  } finally { reader.releaseLock(); }
}
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}
function composeEmail(fields: ContactFields) {
  const entries = [
    ["Name", fields.name], ["Email", fields.email], ["Phone", fields.phone],
    ["Properties", fields.properties], ["Location", fields.location || "—"],
    ["Maps Link", fields.mapsLink || "—"], ["Challenges", fields.challenges.join("; ") || "None specified"],
    ["Message", fields.message || "—"],
  ];
  const rows = entries.map(([label, value]) => {
    let content = escapeHtml(value);
    if (label === "Email") content = `<a href="${escapeHtml(`mailto:${encodeURIComponent(fields.email)}`)}">${content}</a>`;
    if (label === "Phone") content = `<a href="${escapeHtml(`tel:${fields.phone.replace(/[^+0-9]/g, "")}`)}">${content}</a>`;
    if (label === "Maps Link" && fields.mapsLink) content = `<a href="${escapeHtml(fields.mapsLink)}">${content}</a>`;
    return `<tr><th style="text-align:left;vertical-align:top;padding:8px">${label}</th><td style="padding:8px;white-space:pre-line">${content}</td></tr>`;
  }).join("");
  return {
    subject: "New Enquiry — MPG Website", // No user-supplied subject/header content.
    html: `<div style="font-family:Arial,sans-serif;color:#1A1A1A"><h1>New Enquiry — MPG Website</h1><table>${rows}</table><p>Sent via the MacFarlane Property Group website contact form.</p></div>`,
    text: `New Enquiry — MPG Website\n\n${entries.map(([label, value]) => `${label}: ${value}`).join("\n\n")}\n\nSent via the MacFarlane Property Group website contact form.`,
  };
}
export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const respond = (status: number, category: string, error?: string, fields?: object) => {
    // No identities, request bytes, provider objects or provider IDs in diagnostics.
    console.info(JSON.stringify({ event: "contact", requestId, outcome: status === 200 ? "sent" : "rejected", category, status }));
    return NextResponse.json(
      status === 200 ? { success: true, requestId } : { success: false, error, fields, requestId, contacts: publicContacts },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  };
  if (!allowedOrigin(request)) return respond(403, "origin", "Please send your enquiry using the form on our website, or contact us directly.");
  if (!supportedMediaType(request.headers.get("content-type"))) return respond(415, "media_type", "Please send your enquiry using the website form.");
  let input: unknown;
  try { input = await readBoundedJson(request); }
  catch (error) {
    const status = error instanceof BodyError ? error.status : 400;
    return respond(status, status === 413 ? "body_limit" : "body_format", status === 413 ? "Your enquiry is too long. Please shorten it or contact us directly." : "Please check your enquiry and try again.");
  }
  const result = validateContact(input);
  if (!result.success) return respond(400, "validation", result.error, result.fields);
  if (!process.env.RESEND_API_KEY) return respond(503, "sender_unavailable", deliveryError);
  // A shared production limiter remains a provider prerequisite. Origin checks
  // supplement validation; they are not authentication or complete spam protection.
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "MPG Website <noreply@updates.macfarlanepropertygroup.co.za>",
      to: ["dean@macfarlanepropertygroup.co.za"], replyTo: result.value.email,
      ...composeEmail(result.value),
    });
    if (error || !data?.id) return respond(503, "sender_failure", deliveryError);
    return respond(200, "delivery_accepted");
  } catch { return respond(503, "sender_failure", deliveryError); }
}
