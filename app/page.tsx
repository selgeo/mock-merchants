import Link from "next/link";

export default function Index() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-semibold">Selgeo mock merchants</h1>
      <p className="mt-4 text-neutral-600">
        Internal test fixture. Not indexed. Not for public consumption.
      </p>
      <ul className="mt-8 space-y-3">
        <li>
          <Link href="/quillbeam" className="underline">/quillbeam</Link> — Newsletter / Creator (freemium)
        </li>
        <li>
          <Link href="/cliperra" className="underline">/cliperra</Link> — EU AI Creator (multi-currency)
        </li>
        <li>
          <Link href="/calltrace" className="underline">/calltrace</Link> — Developer Infra (metered + OAuth)
        </li>
      </ul>
    </main>
  );
}
