import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type Currency = "usd" | "eur" | "gbp" | "mxn";

const PRICE_ENV_BY_CURRENCY: Record<Currency, string> = {
  usd: "CLIPERRA_STRIPE_PRO_PRICE_ID_USD",
  eur: "CLIPERRA_STRIPE_PRO_PRICE_ID_EUR",
  gbp: "CLIPERRA_STRIPE_PRO_PRICE_ID_GBP",
  mxn: "CLIPERRA_STRIPE_PRO_PRICE_ID_MXN",
};

function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === "string" &&
    (value === "usd" || value === "eur" || value === "gbp" || value === "mxn")
  );
}

export async function POST(req: NextRequest) {
  const { click_id, currency } = (await req.json()) as {
    click_id?: string | null;
    currency?: string;
  };

  if (!isCurrency(currency)) {
    return NextResponse.json({ error: "invalid currency" }, { status: 400 });
  }

  const stripeKey = process.env.CLIPERRA_STRIPE_SK;
  const priceEnvKey = PRICE_ENV_BY_CURRENCY[currency];
  const priceId = process.env[priceEnvKey];

  if (!stripeKey || !priceId) {
    console.error(`CLIPERRA_STRIPE_SK or ${priceEnvKey} not set`);
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);

  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/cliperra/dashboard`,
    cancel_url: `${origin}/cliperra/pricing`,
    client_reference_id: click_id ?? undefined,
  });

  if (!session.url) {
    return NextResponse.json({ error: "checkout url missing" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
