"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

type Currency = "usd" | "eur" | "gbp" | "mxn";

const CURRENCIES: Currency[] = ["usd", "eur", "gbp", "mxn"];

const PRO_PRICES: Record<Currency, { amount: number; locale: string; code: string }> = {
  usd: { amount: 29, locale: "en-US", code: "USD" },
  eur: { amount: 27, locale: "en-IE", code: "EUR" },
  gbp: { amount: 23, locale: "en-GB", code: "GBP" },
  mxn: { amount: 549, locale: "es-MX", code: "MXN" },
};

const PRO_FEATURES = [
  "Up to 5 hours of rendered video per month",
  "4K exports",
  "Captions in all eleven languages",
  "Brand kits and colour grades",
  "Three editor seats",
  "Priority render queue",
  "7-day trial included",
];

function formatPrice(currency: Currency): string {
  const { amount, locale, code } = PRO_PRICES[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CliperraPricing() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cliperra-currency");
    if (stored && (CURRENCIES as string[]).includes(stored)) {
      setCurrency(stored as Currency);
    }
    setHydrated(true);
  }, []);

  const handleCurrencyChange = (next: Currency) => {
    setCurrency(next);
    localStorage.setItem("cliperra-currency", next);
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/cliperra" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="font-semibold tracking-tight">Cliperra</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/cliperra/sign-up"
            className="rounded bg-purple-600 px-4 py-2 text-white"
          >
            Start the 7-day trial
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20">
        <h1 className="text-center text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-600">
          One tier, every feature. Edit short-form video at the speed of thought —
          starting with a 7-day trial.
        </p>

        <div className="mt-10 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Select currency"
            className="inline-flex rounded border border-neutral-200 p-1"
          >
            {CURRENCIES.map((c) => {
              const active = currency === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    handleCurrencyChange(c);
                  }}
                  className={`rounded px-4 py-2 text-sm font-medium uppercase tracking-wide ${
                    active
                      ? "bg-purple-600 text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <div className="rounded-lg border border-purple-600 p-8 ring-2 ring-purple-600">
            <h2 className="text-xl font-semibold">Cliperra Pro</h2>
            <p className="mt-2 text-3xl font-bold">
              {hydrated ? formatPrice(currency) : ""}
            </p>
            <p className="text-sm text-neutral-500">per month</p>
            <p className="mt-4 text-sm text-neutral-600">
              For creators and small teams shipping every week.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {PRO_FEATURES.map((f) => {
                return <li key={f}>• {f}</li>;
              })}
            </ul>
            <Link
              href="/cliperra/upgrade"
              className="mt-8 inline-block w-full rounded bg-purple-600 py-3 text-center text-white"
            >
              Upgrade to Cliperra Pro
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
