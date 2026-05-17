import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function CliperraDashboard() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center px-6 py-8">
        <Link href="/cliperra" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="font-semibold tracking-tight">Cliperra</span>
        </Link>
      </header>
      <section className="container mx-auto max-w-xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to Cliperra</h1>
        <p className="mt-4 text-neutral-600">
          Your trial workspace is ready. Drop in long footage and Cliperra will trim,
          caption and colour-grade it for you.
        </p>
        <Link
          href="/cliperra/upgrade"
          className="mt-8 inline-block rounded bg-purple-600 px-6 py-3 text-white"
        >
          Upgrade to Cliperra Pro
        </Link>
      </section>
    </main>
  );
}
