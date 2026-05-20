import Link from "next/link";
import { AudioLines } from "lucide-react";

export const dynamic = "force-static";

const FREE_FEATURES = [
  "60 minutes of conversation per month",
  "All SDKs (TypeScript, Python, Go)",
  "Full trace retention",
  "Community Discord",
  "No credit card",
];

const PRO_FEATURES = [
  "Unlimited usage",
  "Unlimited concurrency",
  "Unlimited projects",
  "Full trace retention",
  "Email and Slack support",
  "Your existing keys keep working",
];

export default function CalltracePricing() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/calltrace" className="flex items-center gap-2">
          <AudioLines className="h-6 w-6 text-blue-500" />
          <span className="font-semibold tracking-tight">Calltrace</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/calltrace/sign-up"
            className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400"
          >
            Sign in with GitHub
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20">
        <h1 className="text-center text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
          Prototype on the free tier. Upgrade when you ship to production.
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <PricingCard
            tier="Free"
            price="$0"
            cadence="forever"
            description="60 minutes of conversation per month, all SDKs, full traces, community Discord. No credit card."
            features={FREE_FEATURES}
            cta="Sign in with GitHub"
            href="/calltrace/sign-up"
            prominent
          />
          <PricingCard
            tier="Calltrace Pro"
            price="$49"
            cadence="per month"
            description="Unlimited usage, unlimited concurrency, unlimited projects, email and Slack support."
            features={PRO_FEATURES}
            cta="Upgrade to Pro"
            href="/calltrace/upgrade"
          />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-neutral-500">
          Free tier includes 60 minutes of conversation per month. Pro includes unlimited
          usage at $49/month flat for v1 — true metered pricing ($0.05 per minute) coming
          soon.
        </p>
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
      className={`rounded-lg border bg-neutral-900 p-8 ${
        prominent ? "border-blue-500 ring-2 ring-blue-500" : "border-neutral-800"
      }`}
    >
      <h2 className="text-xl font-semibold text-neutral-100">{tier}</h2>
      <p className="mt-2 text-3xl font-bold text-neutral-100">{price}</p>
      <p className="text-sm text-neutral-500">{cadence}</p>
      <p className="mt-4 text-sm text-neutral-400">{description}</p>
      <ul className="mt-6 space-y-2 text-sm text-neutral-300">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-block w-full rounded bg-blue-500 py-3 text-center font-medium text-white hover:bg-blue-400"
      >
        {cta}
      </Link>
    </div>
  );
}
