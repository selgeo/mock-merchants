import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, click_id } = (await req.json()) as {
    email: string;
    click_id?: string | null;
  };

  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const apiUrl = `${process.env.SELGEO_API_URL}/api/v1/conversions`;
  const sk = process.env.QUILLBEAM_SELGEO_SK;

  if (!sk) {
    console.error("QUILLBEAM_SELGEO_SK not set");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sk}`,
    },
    body: JSON.stringify({
      event_type: "lead",
      external_transaction_id: `lead:${email}`,
      prospect_email: email,
      amount_cents: 0,
      click_id: click_id ?? undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Selgeo conversion API error", res.status, text);
    return NextResponse.json({ error: "tracking failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
