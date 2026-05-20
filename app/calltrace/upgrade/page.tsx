"use client";
import { useEffect, useState } from "react";

export default function CalltraceUpgrade() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const click_id = sessionStorage.getItem("__selgeo_cid");
    void (async () => {
      const res = await fetch("/api/calltrace/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ click_id }),
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
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100">
      <div className="text-center">
        <p className="text-lg text-neutral-300">Redirecting to checkout…</p>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
    </main>
  );
}
