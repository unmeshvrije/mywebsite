"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Clock, Copy, Euro, MapPin } from "lucide-react";
import {
  UNYOG_CONTACT,
  UNYOG_PHOTOS,
  unyogCopy,
  type UnYogCopy,
} from "@/lib/unyog";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BodyGame from "./BodyGame";
import UnYogNavbar from "./UnYogNavbar";
import { useLang } from "./useLang";

// Picks an icon for an offer detail line from what it talks about.
function DetailIcon({ text }: { text: string }) {
  const className = "text-clay-600 shrink-0 mt-0.5";
  if (text.includes("euro")) return <Euro size={16} className={className} />;
  if (text.includes("Amsterdam")) return <MapPin size={16} className={className} />;
  return <Clock size={16} className={className} />;
}

function Details({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pt-4 border-t border-ink/10">
      {items.map((d) => (
        <li key={d} className="flex items-start gap-2 text-sm text-ink/85">
          <DetailIcon text={d} />
          {d}
        </li>
      ))}
    </ul>
  );
}

function AskLink({ label }: { label: string }) {
  return (
    <a
      href="#contact"
      className="group inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-clay-700 hover:text-clay-600 transition-colors"
    >
      {label}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

const cardClass =
  "flex flex-col rounded-2xl bg-white/70 border border-ink/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full";

// Shows the email as plain, selectable text with a copy button. No mailto
// link, so nothing opens a mail app the visitor did not choose.
function EmailCopy({ c }: { c: UnYogCopy["contact"] }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(UNYOG_CONTACT.email);
    } catch {
      // Clipboard blocked: select the address so the visitor can copy it.
      const range = document.createRange();
      if (textRef.current) range.selectNodeContents(textRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl sm:rounded-full bg-white/80 border border-ink/10 shadow-sm px-6 py-3 sm:pr-2 sm:py-2">
      <span className="sr-only">{c.emailLabel}: </span>
      <span ref={textRef} className="font-serif text-2xl md:text-3xl text-ink select-all break-all">
        {UNYOG_CONTACT.email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full bg-clay-600 px-4 py-2 text-sm font-medium text-white hover:bg-clay-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600 transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span aria-live="polite">{copied ? c.copied : c.copy}</span>
      </button>
    </div>
  );
}

export default function UnYogPage() {
  const lang = useLang();
  const c = unyogCopy[lang];
  const offerPhotos = [UNYOG_PHOTOS.teamReset, UNYOG_PHOTOS.droga];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <UnYogNavbar lang={lang} nav={c.nav} />
      <main lang={lang} className="flex-1">
        {/* Hero */}
        <section className="px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-serif text-6xl md:text-8xl font-semibold tracking-tight text-ink">
                {c.hero.title}
              </h1>
              <p className="font-serif italic text-xl md:text-2xl text-clay-600 mt-3 mb-6">
                {c.hero.subtitle}
              </p>
              <p className="text-ink/75 leading-relaxed max-w-xl mx-auto md:mx-0 mb-9">
                {c.hero.body}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-clay-600 text-white font-medium hover:bg-clay-700 transition-colors"
                >
                  {c.hero.primaryCta}
                </a>
                <a
                  href="#game"
                  className="px-6 py-3 rounded-full border border-ink/20 text-ink font-medium hover:border-clay-600 hover:text-clay-700 transition-colors"
                >
                  {c.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm md:max-w-md">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-clay-500/20" />
              <Image
                src={UNYOG_PHOTOS.hero.src}
                width={UNYOG_PHOTOS.hero.width}
                height={UNYOG_PHOTOS.hero.height}
                alt={c.hero.photoAlt}
                priority
                sizes="(min-width: 768px) 448px, 384px"
                className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Companies */}
        <section id="companies" className="py-24 px-6 bg-sand-100 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-semibold text-ink mb-4 text-center">
                {c.companies.heading}
              </h2>
              <p className="text-ink/75 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                {c.companies.lead}
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {c.companies.offers.map((offer, i) => (
                <ScrollReveal key={offer.title}>
                  <article className={cardClass}>
                    <Image
                      src={offerPhotos[i].src}
                      width={offerPhotos[i].width}
                      height={offerPhotos[i].height}
                      alt={offer.photoAlt}
                      sizes="(min-width: 768px) 496px, 100vw"
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-serif text-2xl font-semibold text-ink mb-3">
                        {offer.title}
                      </h3>
                      <p className="text-ink/75 text-sm leading-relaxed mb-5 flex-1">
                        {offer.body}
                      </p>
                      <Details items={offer.details} />
                      <AskLink label={c.companies.cta} />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Couples */}
        <section id="couples" className="py-24 px-6 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-semibold text-ink mb-12 text-center">
                {c.couples.heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <article className={`${cardClass} md:flex-row`}>
                <Image
                  src={UNYOG_PHOTOS.couples.src}
                  width={UNYOG_PHOTOS.couples.width}
                  height={UNYOG_PHOTOS.couples.height}
                  alt={c.couples.photoAlt}
                  sizes="(min-width: 768px) 496px, 100vw"
                  className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto object-cover"
                />
                <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
                  <h3 className="font-serif text-2xl font-semibold text-ink mb-3">
                    {c.couples.lead}
                  </h3>
                  <p className="text-ink/75 text-sm leading-relaxed mb-5">{c.couples.body}</p>
                  <Details items={c.couples.details} />
                  <AskLink label={c.couples.cta} />
                </div>
              </article>
            </ScrollReveal>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-6 bg-sand-100 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center">
              <ScrollReveal>
                <Image
                  src={UNYOG_PHOTOS.about.src}
                  width={UNYOG_PHOTOS.about.width}
                  height={UNYOG_PHOTOS.about.height}
                  alt={c.about.photoAlt}
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="w-full max-w-sm mx-auto aspect-[4/5] object-cover rounded-[2rem] shadow-lg"
                />
              </ScrollReveal>
              <ScrollReveal>
                <h2 className="font-serif text-4xl font-semibold text-ink mb-6 text-center md:text-left">
                  {c.about.heading}
                </h2>
                <div className="space-y-4 text-ink/80 leading-relaxed">
                  {c.about.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {/* TODO(Unmesh): Add training lineage or certification here (EN and NL in src/lib/unyog.ts).
                      Also mention business liability insurance later. */}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Body Game */}
        <section id="game" className="py-24 px-6 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-semibold text-ink mb-4 text-center">
                {c.game.heading}
              </h2>
              <p className="text-ink/75 text-center max-w-2xl mx-auto mb-4 leading-relaxed">
                {c.game.body}
              </p>
              <p className="text-clay-700 text-sm font-medium text-center max-w-2xl mx-auto mb-10">
                {c.game.disclaimer}
              </p>
            </ScrollReveal>
            <BodyGame lang={lang} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6 bg-sand-100 scroll-mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-semibold text-ink mb-4">
                {c.contact.heading}
              </h2>
              <p className="text-ink/75 mb-10">{c.contact.lead}</p>
              <EmailCopy c={c.contact} />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer showUnYogLink={false} />
    </>
  );
}
