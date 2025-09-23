import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Environment
const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL; // must be on a verified domain
const toEmail = (process.env.TO_EMAIL ?? fromEmail) as string; // where messages are delivered
// Fallback to Resend sandbox sender if not provided explicitly
const fallbackFrom = process.env.RESEND_FALLBACK_FROM || "onboarding@resend.dev";

// Resend client (only if configured)
const resend = apiKey ? new Resend(apiKey) : null;

// Helpers
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isContactBody(value: unknown): value is ContactBody {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" && v.name.trim().length > 0 &&
    typeof v.email === "string" && v.email.trim().length > 0 &&
    typeof v.subject === "string" && v.subject.trim().length > 0 &&
    typeof v.message === "string" && v.message.trim().length > 0
  );
}

function toMessage(err: unknown): string {
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === "string") return m;
    try {
      return JSON.stringify(err);
    } catch {
      return "Unknown error";
    }
  }
  return "Unknown error";
}

function toStatusCode(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null && "statusCode" in err) {
    const sc = (err as { statusCode?: unknown }).statusCode;
    if (typeof sc === "number") return sc;
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    // Unique ID to avoid downstream email threading (per submission)
    const ticketId = `PV-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    const bodyUnknown = await request.json();
    if (!isContactBody(bodyUnknown)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { name, email, subject, message } = bodyUnknown;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!resend || !fromEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not available. Set RESEND_API_KEY and FROM_EMAIL (verified domain). Optionally set RESEND_FALLBACK_FROM for temporary sending during verification.",
        },
        { status: 503 },
      );
    }

    // Primary send using your verified domain address
    const primary = await resend.emails.send({
      from: `Pivotr Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Contact Form: ${escapeHtml(subject)} [#${ticketId}]`,
      headers: { "X-Entity-Ref-ID": ticketId },
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (!primary.error) {
      let ackSent = false;
      try {
        const ack = await resend.emails.send({
          from: `Pivotr Support <${fromEmail}>`,
          to: [email],
          replyTo: fromEmail,
          subject: `Thanks — we’ve received your message [#${ticketId}]`,
          headers: { "X-Entity-Ref-ID": ticketId },
          html: `
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thanks for contacting Pivotr Technologies. We’ve received your request regarding “${escapeHtml(subject)}”. Our team will get back to you soon.</p>
            <p>If you need anything in the meantime, write to <strong>support@pivotr.in</strong>.</p>
            <p>— Pivotr Support</p>
          `,
        });
        ackSent = !ack.error;
        if (ack.error) {
          console.error("Resend ack send failed:", ack.error);
        }
      } catch (ackErr) {
        console.error("Resend ack send threw:", ackErr);
      }
      return NextResponse.json({ success: true, data: primary.data, ackSent }, { status: 200 });
    }

    // If domain not verified (403) and a fallback sender is configured, retry using fallback sender
    const status = toStatusCode(primary.error) ?? 502;
    if (status === 403 && fallbackFrom) {
      try {
        const retry = await resend.emails.send({
          from: `Pivotr Contact Form <${fallbackFrom}>`,
          to: [toEmail],
          replyTo: email,
          subject: `Contact Form: ${escapeHtml(subject)} [#${ticketId}]`,
          headers: { "X-Entity-Ref-ID": ticketId },
          html: `
            <h2>New Message from Contact Form</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            <hr />
            <p style="font-size: 12px; color: #666;">Sent using fallback sender while domain verification is pending.</p>
          `,
        });
        if (!retry.error) {
          let ackSent = false;
          try {
            const ack = await resend.emails.send({
              from: `Pivotr Support <${fallbackFrom}>`,
              to: [email],
              replyTo: fromEmail,
              subject: `Thanks — we’ve received your message [#${ticketId}]`,
              headers: { "X-Entity-Ref-ID": ticketId },
              html: `
                <p>Hi ${escapeHtml(name)},</p>
                <p>Thanks for contacting Pivotr Technologies. We’ve received your request regarding “${escapeHtml(subject)}”. Our team will get back to you soon.</p>
                <p>If you need anything in the meantime, write to <strong>support@pivotr.in</strong>.</p>
                <p>— Pivotr Support</p>
              `,
            });
            ackSent = !ack.error;
            if (ack.error) {
              console.error("Resend ack send (fallback) failed:", ack.error);
            }
          } catch (ackErr) {
            console.error("Resend ack send (fallback) threw:", ackErr);
          }
          return NextResponse.json(
            { success: true, data: retry.data, fallback: true, ackSent },
            { status: 200 },
          );
        }
      } catch (fallbackErr: unknown) {
        console.error("Resend fallback send failed:", fallbackErr);
      }
    }

    // Return Resend error with accurate status code
    return NextResponse.json(
      { success: false, error: toMessage(primary.error) },
      { status },
    );
  } catch (error: unknown) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, error: toMessage(error) || "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}