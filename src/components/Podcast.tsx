import { podcastInfo } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Podcast() {
  return (
    <section id="podcast" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-white mb-2 text-center">
            {podcastInfo.title}
          </h2>
          <p className="text-slate-500 text-center mb-10">
            {podcastInfo.titleRomanized}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            {podcastInfo.description}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-xl overflow-hidden">
            <iframe
              src={podcastInfo.spotifyEmbedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              title="Spotify podcast player"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
