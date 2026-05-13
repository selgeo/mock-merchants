import Link from "next/link";
import { Feather } from "lucide-react";

export const dynamic = "force-static";

export default function QuillbeamHome() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/quillbeam" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-amber-600" />
          <span className="font-semibold tracking-tight">Quillbeam</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/quillbeam/pricing">Pricing</Link>
          <Link
            href="/quillbeam/sign-up"
            className="rounded bg-amber-600 px-4 py-2 text-white"
          >
            Start writing for free
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-600">
          Write the issue. We handle the rest.
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          A newsletter platform that stays out of the way of the writing.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600">
          Quillbeam gives independent writers, journalists and small publishers a clean
          editor, honest analytics and a path to paid subscriptions — without the
          dashboard fatigue.
        </p>
        <Link
          href="/quillbeam/sign-up"
          className="mt-10 inline-block rounded bg-amber-600 px-8 py-3 text-white"
        >
          Start writing for free
        </Link>
      </section>

      <section className="container mx-auto grid gap-8 px-6 py-12 md:grid-cols-3">
        <FeatureCard
          heading="An editor that respects the draft"
          body="Markdown, live preview and version history. No floating toolbars, no surprise reformatting when you paste from your notes app. Save, send, schedule — that is the whole workflow."
        />
        <FeatureCard
          heading="Subscriber lists you actually own"
          body="Export anytime as CSV. Import without a forty-step migration. Quillbeam treats your audience as your relationship, not as a feature flag."
        />
        <FeatureCard
          heading="Paid tiers when you are ready"
          body="Switch on memberships in five minutes with Stripe. Free issues, paid issues, founding-member tiers — all in one list, all in one editor."
        />
      </section>

      <section className="container mx-auto grid gap-6 px-6 py-12 md:grid-cols-2">
        <Testimonial
          quote="I write a weekly letter on housing policy. Quillbeam is the first platform where the editor disappears when I am drafting. That sounds small. It is not."
          author="Imogen Hartley, independent journalist, Manchester"
        />
        <Testimonial
          quote="We migrated three thousand readers in an afternoon. Paid tier was live the next morning. The whole point of the platform is that there is no whole point — it just works."
          author="Tomás Reis, publisher of a regional food letter, Porto"
        />
      </section>

      <footer className="container mx-auto border-t px-6 py-8 text-sm text-neutral-500">
        Quillbeam is built for writers who would rather spend the afternoon on a
        paragraph than on a settings page.
      </footer>
    </main>
  );
}

function FeatureCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded border border-neutral-200 p-6">
      <h3 className="font-semibold">{heading}</h3>
      <p className="mt-2 text-sm text-neutral-600">{body}</p>
    </div>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <blockquote className="rounded border border-neutral-200 p-6">
      <p className="text-neutral-800">&ldquo;{quote}&rdquo;</p>
      <cite className="mt-3 block text-sm text-neutral-500 not-italic">— {author}</cite>
    </blockquote>
  );
}
