/**
 * /api/feedback route
 * ------------------------------------------------------------------
 * Receives a feedback message from the contact page's Feedback section
 * and emails it to the site owner via Resend.
 * ------------------------------------------------------------------
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = "faleelmr4@gmail.com";

export async function POST(request: Request) {
  let body: { message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = body.message?.trim();

  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "ByteCraft <onboarding@resend.dev>",
    to: [OWNER_EMAIL],
    subject: "New feedback from the ByteCraft website",
    text: message,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, id: data?.id });
}