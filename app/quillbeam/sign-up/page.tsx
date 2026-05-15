"use client";
import { useState } from "react";
import Link from "next/link";
import { Feather } from "lucide-react";

export default function QuillbeamSignUp() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const click_id =
      typeof window !== "undefined"
        ? sessionStorage.getItem("__selgeo_cid")
        : null;
    const res = await fetch("/api/quillbeam/track-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, click_id }),
    });
    if (res.ok) {
      window.location.href = "/quillbeam/dashboard";
    } else {
      setSubmitting(false);
      setError("Sign-up failed. Try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center px-6 py-8">
        <Link href="/quillbeam" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-amber-600" />
          <span className="font-semibold tracking-tight">Quillbeam</span>
        </Link>
      </header>
      <section className="container mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Start writing for free</h1>
        <p className="mt-3 text-neutral-600">No card needed. Stay on Free as long as it serves you.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Work email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="mt-1 block w-full rounded border border-neutral-300 px-3 py-2"
              placeholder="you@example.com"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-amber-600 py-3 text-white disabled:opacity-50"
          >
            {submitting ? "Creating account…" : "Open the editor"}
          </button>
        </form>
      </section>
    </main>
  );
}
