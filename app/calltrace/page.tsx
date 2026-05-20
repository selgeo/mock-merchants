import Link from "next/link";
import { AudioLines } from "lucide-react";

export const dynamic = "force-static";

export default function CalltraceHome() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="container mx-auto flex items-center justify-between px-6 py-8">
        <Link href="/calltrace" className="flex items-center gap-2">
          <AudioLines className="h-6 w-6 text-blue-500" />
          <span className="font-semibold tracking-tight">Calltrace</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/calltrace/pricing" className="text-neutral-300 hover:text-neutral-100">
            Pricing
          </Link>
          <Link
            href="/calltrace/sign-up"
            className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400"
          >
            Sign in with GitHub
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-6 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-500">
          Voice AI infrastructure with a stack trace.
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-100">
          Build voice agents you can step through, line by line.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-400">
          Calltrace is a voice AI runtime with first-class observability. Every turn is a
          span; every span is replayable. Ship agents you can actually maintain.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/calltrace/sign-up"
            className="inline-block rounded bg-blue-500 px-8 py-3 font-medium text-white hover:bg-blue-400"
          >
            Sign in with GitHub
          </Link>
          <Link
            href="/calltrace/pricing"
            className="inline-block rounded border border-neutral-700 px-8 py-3 font-medium text-neutral-200 hover:bg-neutral-900"
          >
            Read the docs
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-left font-mono text-sm shadow-lg">
          <div className="mb-3 flex items-center gap-2 text-xs text-neutral-500">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-3">quickstart.ts</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed">
            <code>
              <span className="text-purple-400">import</span>
              <span className="text-neutral-300">{" { "}</span>
              <span className="text-blue-300">Calltrace</span>
              <span className="text-neutral-300">{" } "}</span>
              <span className="text-purple-400">from</span>
              <span className="text-green-300">{" '@calltrace/sdk'"}</span>
              <span className="text-neutral-500">;</span>
              {"\n\n"}
              <span className="text-purple-400">const</span>
              <span className="text-neutral-300"> agent </span>
              <span className="text-neutral-500">=</span>
              <span className="text-neutral-300"> </span>
              <span className="text-purple-400">new</span>
              <span className="text-neutral-300"> </span>
              <span className="text-blue-300">Calltrace</span>
              <span className="text-neutral-300">({"{"}</span>
              {"\n  "}
              <span className="text-neutral-300">apiKey: </span>
              <span className="text-blue-300">process</span>
              <span className="text-neutral-300">.env.</span>
              <span className="text-neutral-100">CALLTRACE_API_KEY</span>
              <span className="text-neutral-500">,</span>
              {"\n  "}
              <span className="text-neutral-300">model: </span>
              <span className="text-green-300">{"'gpt-4o'"}</span>
              <span className="text-neutral-500">,</span>
              {"\n  "}
              <span className="text-neutral-300">voice: </span>
              <span className="text-green-300">{"'alloy'"}</span>
              <span className="text-neutral-500">,</span>
              {"\n"}
              <span className="text-neutral-300">{"});"}</span>
              {"\n\n"}
              <span className="text-purple-400">await</span>
              <span className="text-neutral-300"> agent.</span>
              <span className="text-yellow-300">handle</span>
              <span className="text-neutral-300">(call);</span>
              <span className="text-neutral-500">  {"// every turn is a span"}</span>
            </code>
          </pre>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-6 py-12 md:grid-cols-3">
        <FeatureCard
          heading="Spans for every turn"
          body="Each user utterance, model call, tool invocation and TTS render is a span in the trace. Replay any conversation in the dashboard with audio, transcripts and tool I/O aligned on one timeline."
        />
        <FeatureCard
          heading="SDKs that match your stack"
          body="TypeScript, Python and Go SDKs. Bring your own LLM, your own STT, your own TTS — or use the defaults. Configuration is code, not a dashboard wizard."
        />
        <FeatureCard
          heading="Metered pricing, no surprises"
          body="You pay $0.05 per minute of conversation. No per-seat fee, no concurrency cap, no minimum spend. Free tier covers the first 60 minutes per month so you can prototype before signing in."
        />
      </section>

      <section className="container mx-auto grid gap-6 px-6 py-12 md:grid-cols-2">
        <Testimonial
          quote="We replaced three vendors with Calltrace and a hundred lines of TypeScript. The trace view paid for itself the first time a customer reported a weird hand-off."
          author="Linnea Sjögren, staff engineer at a Stockholm developer-tools start-up"
        />
        <Testimonial
          quote="Voice agents used to be the part of the stack I dreaded touching. With proper spans I can actually read the bug report instead of guessing."
          author="Stefan Kremer, framework maintainer, Berlin"
        />
      </section>

      <footer className="container mx-auto border-t border-neutral-800 px-6 py-8 text-sm text-neutral-500">
        Calltrace is a developer tool, priced like a developer tool — read the source, run
        the SDK, pay only for the minutes you actually ship.
      </footer>
    </main>
  );
}

function FeatureCard({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <h3 className="font-semibold text-neutral-100">{heading}</h3>
      <p className="mt-2 text-sm text-neutral-400">{body}</p>
    </div>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <blockquote className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <p className="text-neutral-200">&ldquo;{quote}&rdquo;</p>
      <cite className="mt-3 block text-sm text-neutral-500 not-italic">— {author}</cite>
    </blockquote>
  );
}
