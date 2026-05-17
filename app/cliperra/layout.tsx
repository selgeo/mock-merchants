import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cliperra — short-form video, edited at the speed of thought",
  description:
    "Cliperra trims, captions and colours your videos with AI tuned for European creators. Keep your style, keep your data on the continent, ship more often.",
  robots: { index: false, follow: false },
};

export default function CliperraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src={process.env.NEXT_PUBLIC_SELGEO_SNIPPET_URL}
        data-merchant={process.env.NEXT_PUBLIC_CLIPERRA_MERCHANT_KEY}
        data-api-url={process.env.NEXT_PUBLIC_SELGEO_API_URL}
        strategy="afterInteractive"
      />
    </>
  );
}
