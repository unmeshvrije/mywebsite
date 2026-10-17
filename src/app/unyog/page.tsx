import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import UnYogPage from "@/components/unyog/UnYogPage";

// A warm serif for UnYog headings. Loaded on this page only.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const title = "UnYog | Authentic Yog, taught in Amsterdam";
const description =
  "Twenty years of Yog practice and study at the source, brought to Amsterdam. Team sessions for companies and private sessions for couples.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/unyog" },
  openGraph: {
    title,
    description,
    url: "https://unme.sh/unyog",
    siteName: "Unmesh Joshi",
    locale: "en_US",
    alternateLocale: ["nl_NL"],
    type: "website",
    images: [{ url: "/images/unyog/hero-sunset.webp", width: 1000, height: 1333 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <div className={`${fraunces.variable} flex-1 flex flex-col bg-sand-50 text-ink`}>
      <UnYogPage />
    </div>
  );
}
