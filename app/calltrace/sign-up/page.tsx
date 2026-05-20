"use client";
import { useState } from "react";
import Link from "next/link";
import { AudioLines } from "lucide-react";

// Mock OAuth: visual element only — submission still goes through email backend.
// Real OAuth deferred to #086. Clicking "Continue with GitHub" prompts the visitor
// for a GitHub handle, then submits a synthetic e-mail (<handle>@calltrace-mock.dev)
// to the same /api/calltrace/track-lead endpoint as the email path.
//
// GitHub logo: inline SVG (Lucide v1 dropped brand icons for trademark reasons).
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297a12 12 0 0 0-3.793 23.39c.6.111.82-.261.82-.58 0-.286-.01-1.045-.016-2.052-3.338.726-4.043-1.61-4.043-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.302-5.466-1.333-5.466-5.93 0-1.31.469-2.382 1.236-3.221-.124-.302-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.874.12 3.176.77.839 1.235 1.911 1.235 3.221 0 4.609-2.806 5.625-5.479 5.92.43.371.813 1.102.813 2.222 0 1.604-.014 2.896-.014 3.289 0 .322.216.697.825.578A12.001 12.001 0 0 0 12 .297z" />
    </svg>
  );
}
export default function CalltraceSignUp() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitLead(leadEmail: string) {
    setSubmitting(true);
    setError(null);
    const click_id =
      typeof window !== "undefined"
        ? sessionStorage.getItem("__selgeo_cid")
        : null;
    const res = await fetch("/api/calltrace/track-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: leadEmail, click_id }),
    });
    if (res.ok) {
      window.location.href = "/calltrace/dashboard";
    } else {
      setSubmitting(false);
      setError("Sign-up failed. Try again.");
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitLead(email);
  }

  async function handleGithubClick() {
    // Mock OAuth flow: prompt for a GitHub handle and synthesise an e-mail.
    // Real OAuth deferred to #086 — track-lead still needs an e-mail to identify the lead.
    const handle = window.prompt("Mock GitHub OAuth — enter your GitHub handle:");
    if (!handle) {
      return;
    }
    const safeHandle = handle.trim().replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    if (!safeHandle) {
      setError("Please enter a valid GitHub handle.");
      return;
    }
    await submitLead(`${safeHandle}@calltrace-mock.dev`);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="container mx-auto flex items-center px-6 py-8">
        <Link href="/calltrace" className="flex items-center gap-2">
          <AudioLines className="h-6 w-6 text-blue-500" />
          <span className="font-semibold tracking-tight">Calltrace</span>
        </Link>
      </header>
      <section className="container mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in to Calltrace</h1>
        <p className="mt-3 text-neutral-400">
          No credit card. Sign up with GitHub, ship a working demo before you decide
          anything.
        </p>

        <button
          type="button"
          onClick={handleGithubClick}
          disabled={submitting}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded bg-neutral-100 px-4 py-3 font-medium text-neutral-900 hover:bg-white disabled:opacity-50"
        >
          <GithubIcon className="h-5 w-5" />
          {submitting ? "Signing in…" : "Continue with GitHub"}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
          <span className="h-px flex-1 bg-neutral-800" />
          <span>or with email</span>
          <span className="h-px flex-1 bg-neutral-800" />
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-neutral-300">Work email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="mt-1 block w-full rounded border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder:text-neutral-600 focus:border-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded border border-neutral-700 py-3 font-medium text-neutral-200 hover:bg-neutral-900 disabled:opacity-50"
          >
            {submitting ? "Creating account…" : "Run the quickstart"}
          </button>
        </form>
      </section>
    </main>
  );
}
