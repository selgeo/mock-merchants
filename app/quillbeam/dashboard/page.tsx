import Link from "next/link";
import { Feather } from "lucide-react";

export default function QuillbeamDashboard() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center px-6 py-8">
        <Link href="/quillbeam" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-amber-600" />
          <span className="font-semibold tracking-tight">Quillbeam</span>
        </Link>
      </header>
      <section className="container mx-auto max-w-xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome to Quillbeam</h1>
        <p className="mt-4 text-neutral-600">
          You&rsquo;re on the Free plan. Unlimited subscribers, unlimited free issues,
          custom domain, basic analytics.
        </p>
        <Link
          href="/quillbeam/upgrade"
          className="mt-8 inline-block rounded bg-amber-600 px-6 py-3 text-white"
        >
          Upgrade to Quillbeam Pro — $43/mo
        </Link>
      </section>
    </main>
  );
}
