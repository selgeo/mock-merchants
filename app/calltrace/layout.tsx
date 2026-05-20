import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calltrace — voice AI infrastructure with a stack trace",
  description:
    "Calltrace is a voice AI runtime with first-class observability. Every turn is a span; every span is replayable. Ship agents you can actually maintain.",
  robots: { index: false, follow: false },
};

export default function CalltraceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark bg-neutral-950 text-neutral-100">
      {children}
      <Script
        src={process.env.NEXT_PUBLIC_SELGEO_SNIPPET_URL}
        data-merchant={process.env.NEXT_PUBLIC_CALLTRACE_MERCHANT_KEY}
        data-api-url={process.env.NEXT_PUBLIC_SELGEO_API_URL}
        strategy="afterInteractive"
      />
    </div>
  );
}
