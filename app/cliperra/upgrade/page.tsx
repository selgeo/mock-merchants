"use client";
import { useEffect, useState } from "react";

type Currency = "usd" | "eur" | "gbp" | "mxn";

const CURRENCIES: Currency[] = ["usd", "eur", "gbp", "mxn"];

export default function CliperraUpgrade() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const click_id = sessionStorage.getItem("__selgeo_cid");
    const stored = localStorage.getItem("cliperra-currency");
    const currency: Currency =
      stored && (CURRENCIES as string[]).includes(stored)
        ? (stored as Currency)
        : "usd";

    void (async () => {
      const res = await fetch("/api/cliperra/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ click_id, currency }),
      });
      if (!res.ok) {
        setError("Checkout failed. Try again.");
        return;
      }
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    })();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-neutral-900">
      <div className="text-center">
        <p className="text-lg">Redirecting to checkout…</p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );
}
