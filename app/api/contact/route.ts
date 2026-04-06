import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Resend free tier supports 100 emails/day — sufficient for this stage.
// To upgrade, visit https://resend.com and select a paid plan.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, properties, location, mapsLink, challenges, message } = body;

    // Basic validation — name, email, and phone are required
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const challengeList =
      Array.isArray(challenges) && challenges.length > 0
        ? challenges.map((c: string) => `<li>${c}</li>`).join("")
        : "<li>None specified</li>";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
        <div style="background: #0F1E3C; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">New Enquiry — MPG Website</h1>
        </div>
        <div style="background: #F8F7F4; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%; color: #6B7280;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280;">Phone</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #C9A84C;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280;">Properties</td>
              <td style="padding: 8px 0;">${properties || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280;">Location</td>
              <td style="padding: 8px 0;">${location || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280;">Maps Link</td>
              <td style="padding: 8px 0;">${
                mapsLink
                  ? `<a href="${mapsLink}" style="color: #C9A84C;">${mapsLink}</a>`
                  : "—"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280; vertical-align: top;">Challenges</td>
              <td style="padding: 8px 0;"><ul style="margin: 0; padding-left: 16px;">${challengeList}</ul></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6B7280; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; white-space: pre-line;">${message || "—"}</td>
            </tr>
          </table>
        </div>
        <p style="color: #6B7280; font-size: 12px; margin-top: 16px; text-align: center;">
          Sent via the MacFarlane Property Group website contact form.
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "MPG Website <onboarding@resend.dev>",
      to: ["dean@macfarlanepropertygroup.co.za"],
      subject: `New Enquiry from ${name} — MPG Website`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
