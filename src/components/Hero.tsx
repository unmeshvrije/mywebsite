import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <div className="relative mx-auto mb-8 w-40 h-40">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl" />
          <Image
            src="/images/unmesh-avatar.png"
            alt="Unmesh Joshi"
            width={160}
            height={160}
            className="relative rounded-full border-2 border-primary-500/30 object-cover"
            priority
          />
        </div>

        {/* Name & tagline */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Unmesh Joshi
        </h1>
        <p className="text-primary-400 text-lg mb-6">
          Software Engineer &middot; AI Researcher &middot; Teacher &middot; Poet
        </p>

        {/* Bio */}
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          I build intelligent software systems and research how AI can transform
          the way we write and understand code. Currently completing my PhD at VU
          Amsterdam, I bring over a decade of backend engineering experience.
          I teach live courses on UNIX internals and the foundations of AI, and
          find creative expression through Marathi poetry.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center">
          <a
            href="#teaching"
            className="px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            My Courses
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-primary-500 hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
