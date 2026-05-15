import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const { click_id } = (await req.json()) as { click_id?: string | null };

  const stripeKey = process.env.QUILLBEAM_STRIPE_SK;
  const priceId = process.env.QUILLBEAM_STRIPE_PRO_PRICE_ID;

  if (!stripeKey || !priceId) {
    console.error("QUILLBEAM_STRIPE_SK or QUILLBEAM_STRIPE_PRO_PRICE_ID not set");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);

  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/quillbeam/dashboard`,
    cancel_url: `${origin}/quillbeam/pricing`,
    client_reference_id: click_id ?? undefined,
  });

  if (!session.url) {
    return NextResponse.json({ error: "checkout url missing" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
