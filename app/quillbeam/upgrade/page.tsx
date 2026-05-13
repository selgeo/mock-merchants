import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Stripe from "stripe";

export default async function QuillbeamUpgrade() {
  const stripe = new Stripe(process.env.QUILLBEAM_STRIPE_SK!);
  const cookieStore = await cookies();
  const click_id = cookieStore.get("__selgeo_click_id")?.value;

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      { price: process.env.QUILLBEAM_STRIPE_PRO_PRICE_ID!, quantity: 1 },
    ],
    success_url: `${baseUrl}/quillbeam/dashboard`,
    cancel_url: `${baseUrl}/quillbeam/pricing`,
    client_reference_id: click_id,
  });

  redirect(session.url!);
}
