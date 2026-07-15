import { NextResponse } from "next/server";
import type { WebhookEventPayload } from "resend";
import { resend } from "@/lib/resend";

// Resend delivers inbound emails as signed `email.received` webhooks.
// The payload only carries metadata; the full email stays stored on Resend,
// so we ask Resend to forward the original message (passthrough) to our inbox.
export async function POST(req: Request) {
  const payload = await req.text();

  let event: WebhookEventPayload;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: req.headers.get("svix-id") ?? "",
        timestamp: req.headers.get("svix-timestamp") ?? "",
        signature: req.headers.get("svix-signature") ?? "",
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET as string,
    });
  } catch (error: any) {
    console.error("Invalid Resend webhook signature:", error);
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ received: true });
  }

  const forwardTo = process.env.RESEND_FORWARD_TO;
  const forwardFrom = process.env.RESEND_FORWARD_FROM;

  if (!forwardTo || !forwardFrom) {
    console.error(
      "Inbound email received but RESEND_FORWARD_TO / RESEND_FORWARD_FROM are not set. Email is kept in the Resend dashboard.",
      { emailId: event.data.email_id, from: event.data.from },
    );
    return NextResponse.json({ received: true });
  }

  try {
    const { error } = await resend.emails.receiving.forward(
      {
        emailId: event.data.email_id,
        to: forwardTo,
        from: forwardFrom,
        passthrough: true,
      },
      // Webhook deliveries are retried; the idempotency key prevents
      // the same email from being forwarded twice.
      { idempotencyKey: `inbound-forward-${event.data.email_id}` },
    );

    if (error) {
      throw new Error(error.message);
    }

    console.log(
      `Forwarded inbound email ${event.data.email_id} from ${event.data.from} to ${forwardTo}`,
    );

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Failed to forward inbound email:", error);
    // Non-2xx makes Resend retry the webhook later; the email itself is
    // already stored on Resend, so nothing is lost.
    return NextResponse.json(
      { message: "Failed to process inbound email", error: error.message },
      { status: 500 },
    );
  }
}
