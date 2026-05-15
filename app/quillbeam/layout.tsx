import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quillbeam — write the issue, we handle the rest",
  description:
    "A newsletter platform that stays out of the way of the writing. Clean editor, honest analytics, paid subscriptions when you are ready.",
  robots: { index: false, follow: false },
};

export default function QuillbeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src={process.env.NEXT_PUBLIC_SELGEO_SNIPPET_URL}
        data-merchant={process.env.NEXT_PUBLIC_QUILLBEAM_MERCHANT_KEY}
        data-api-url={process.env.NEXT_PUBLIC_SELGEO_API_URL}
        strategy="afterInteractive"
      />
    </>
  );
}
