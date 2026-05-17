import Link from "next/link";
import { Sparkles } from "lucide-react";

export const dynamic = "force-static";

export default function CliperraHome() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/cliperra" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="font-semibold tracking-tight">Cliperra</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/cliperra/pricing">Pricing</Link>
          <Link
            href="/cliperra/sign-up"
            className="rounded bg-purple-600 px-4 py-2 text-white"
          >
            Start the 7-day trial
          </Link>
        </nav>
      </header>

      <section className="container mx-auto bg-gradient-to-b from-purple-50 to-white px-6 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-purple-600">
          Short-form video, edited at the speed of thought.
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Turn raw footage into finished clips in a single afternoon.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600">
          Cliperra trims, captions and colours your videos with AI tuned for European
          creators. Keep your style, keep your data on the continent, ship more often.
        </p>
        <Link
          href="/cliperra/sign-up"
          className="mt-10 inline-block rounded bg-purple-600 px-8 py-3 text-white"
        >
          Start the 7-day trial
        </Link>
      </section>

      <section className="container mx-auto grid gap-8 px-6 py-12 md:grid-cols-3">
        <FeatureCard
          heading="Auto-cut, edited like you would"
          body="Drop in long footage and Cliperra finds the moments worth keeping. Every cut is reversible, every choice explainable — no black-box magic."
        />
        <FeatureCard
          heading="Captions in eleven languages"
          body="Native-quality subtitles for English, German, French, Spanish, Italian, Polish, Dutch, Portuguese, Swedish, Czech and Greek. Edit, restyle and burn in without leaving the editor."
        />
        <FeatureCard
          heading="Studio looks, on a laptop"
          body="Apply a colour grade, a soundbed and a brand pack in two clicks. Your channel stays consistent whether you publish weekly or twice a day."
        />
      </section>

      <section className="container mx-auto grid gap-6 px-6 py-12 md:grid-cols-2">
        <Testimonial
          quote="I used to lose Sundays to the timeline. Now I edit a week of shorts before lunch and spend the rest of the day actually filming."
          author="Margaux Vidal, independent travel creator, Lyon"
        />
        <Testimonial
          quote="Our four-person studio runs three client channels through Cliperra. Captions in Dutch and German used to be the bottleneck — now they are a checkbox."
          author="Joran de Vries, founder, small video studio in Utrecht"
        />
      </section>

      <footer className="container mx-auto border-t px-6 py-8 text-sm text-neutral-500">
        Cliperra is built and hosted in the EU; your footage and your subscribers&rsquo;
        data never leave the continent.
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
