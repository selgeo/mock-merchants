import Link from "next/link";
import { Feather } from "lucide-react";

export const dynamic = "force-static";

const FREE_FEATURES = [
  "Unlimited subscribers",
  "Unlimited free issues",
  "Custom domain",
  "Basic analytics",
  "No card needed",
];

const PRO_FEATURES = [
  "Paid memberships",
  "Founding-member tiers",
  "Advanced analytics",
  "Priority email deliverability",
  "Ad-free public archive",
  "Two collaborator seats",
];

export default function QuillbeamPricing() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/quillbeam" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-amber-600" />
          <span className="font-semibold tracking-tight">Quillbeam</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/quillbeam/sign-up"
            className="rounded bg-amber-600 px-4 py-2 text-white"
          >
            Start writing for free
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20">
        <h1 className="text-center text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-600">
          Stay on Free as long as it serves you. Upgrade when paid memberships start
          earning their keep.
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <PricingCard
            tier="Free"
            price="£0"
            cadence="forever"
            description="For writers starting out or testing a habit."
            features={FREE_FEATURES}
            cta="Start writing for free"
            href="/quillbeam/sign-up"
            prominent
          />
          <PricingCard
            tier="Quillbeam Pro"
            price="$43"
            cadence="per month"
            description="For writers earning from their work."
            features={PRO_FEATURES}
            cta="Move your newsletter to Quillbeam"
            href="/quillbeam/upgrade"
          />
        </div>
      </section>
    </main>
  );
}

function PricingCard({
  tier,
  price,
  cadence,
  description,
  features,
  cta,
  href,
  prominent,
}: {
  tier: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  prominent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-8 ${
        prominent ? "border-amber-600 ring-2 ring-amber-600" : "border-neutral-200"
      }`}
    >
      <h2 className="text-xl font-semibold">{tier}</h2>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <p className="text-sm text-neutral-500">{cadence}</p>
      <p className="mt-4 text-sm text-neutral-600">{description}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-block w-full rounded bg-amber-600 py-3 text-center text-white"
      >
        {cta}
      </Link>
    </div>
  );
}
