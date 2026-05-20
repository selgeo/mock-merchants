import Link from "next/link";
import { AudioLines } from "lucide-react";

export default function CalltraceDashboard() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="container mx-auto flex items-center px-6 py-8">
        <Link href="/calltrace" className="flex items-center gap-2">
          <AudioLines className="h-6 w-6 text-blue-500" />
          <span className="font-semibold tracking-tight">Calltrace</span>
        </Link>
      </header>
      <section className="container mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to Calltrace</h1>
        <p className="mt-4 text-neutral-400">
          You&rsquo;re on the Free plan. 60 minutes of conversation per month, all SDKs,
          full trace retention.
        </p>

        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Your API key</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <code className="font-mono text-sm text-blue-300">
              sk_calltrace_mock_4f9c2a1b8e7d6f3a
            </code>
            <span className="rounded border border-neutral-700 px-2 py-0.5 text-xs text-neutral-400">
              mock
            </span>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Use this key in the `Calltrace` SDK constructor. Rotate it any time from
            Settings.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900 p-6 font-mono text-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Quickstart</p>
          <pre className="mt-2 overflow-x-auto leading-relaxed">
            <code>
              <span className="text-neutral-500">$</span>
              <span className="text-neutral-300"> npm install </span>
              <span className="text-green-300">@calltrace/sdk</span>
              {"\n"}
              <span className="text-neutral-500">$</span>
              <span className="text-neutral-300"> export </span>
              <span className="text-neutral-100">CALLTRACE_API_KEY</span>
              <span className="text-neutral-500">=</span>
              <span className="text-green-300">sk_calltrace_mock_…</span>
            </code>
          </pre>
        </div>

        <Link
          href="/calltrace/upgrade"
          className="mt-10 inline-block rounded bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-400"
        >
          Upgrade to Calltrace Pro — $49/mo
        </Link>
      </section>
    </main>
  );
}
