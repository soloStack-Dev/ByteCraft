/**
 * /api/contact route
 * ------------------------------------------------------------------
 * Receives a contact-form submission and emails it to the site owner
 * via Resend. Data is also persisted in Convex by the client before
 * this route is called, so this endpoint only handles the email.
 * ------------------------------------------------------------------
 */
import { Resend } from "resend";

const OWNER_EMAIL = "faleelmr4@gmail.com";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: { username?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const username = body.username?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim();

  if (!username || !email || !phone || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "ByteCraft <onboarding@resend.dev>",
    to: [OWNER_EMAIL],
    subject: `New contact submission from ${username}`,
    replyTo: email,
    text: [
      `You received a new message through the ByteCraft contact form:`,
      ``,
      `Username: ${username}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message}`,
    ].join("\n"),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, id: data?.id });
}