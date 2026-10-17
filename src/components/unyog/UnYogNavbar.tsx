"use client";

import Link from "next/link";
import type { Lang, UnYogCopy } from "@/lib/unyog";
import { setLang } from "./useLang";

export default function UnYogNavbar({ lang, nav }: { lang: Lang; nav: UnYogCopy["nav"] }) {
  const links = [
    { label: nav.companies, href: "#companies" },
    { label: nav.couples, href: "#couples" },
    { label: nav.about, href: "#about" },
    { label: nav.game, href: "#game" },
    { label: nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sand-50/85 backdrop-blur-md border-b border-ink/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink">
          unme.sh
          <span className="text-clay-600">/unyog</span>
        </Link>

        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-ink/70 hover:text-clay-700 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          role="group"
          aria-label="Language / Taal"
          className="flex rounded-full border border-ink/15 p-0.5 text-sm"
        >
          {(["en", "nl"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              lang={l}
              aria-label={l === "en" ? "English" : "Nederlands"}
              className={`px-3 py-1 rounded-full font-medium uppercase transition-colors focus-visible:outline-2 focus-visible:outline-clay-600 ${
                lang === l ? "bg-clay-600 text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
