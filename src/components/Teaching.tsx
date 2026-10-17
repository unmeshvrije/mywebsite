import {
  ArrowUpRight,
  Blocks,
  Brain,
  Code,
  Quote,
  Terminal,
  Users,
} from "lucide-react";
import {
  teachingIntro,
  teachingStats,
  courses,
  analogies,
  testimonials,
} from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const courseIcons = {
  terminal: Terminal,
  brain: Brain,
  users: Users,
  code: Code,
  blocks: Blocks,
};

export default function Teaching() {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section id="teaching" className="py-24 px-6 bg-surface-800/40">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-white mb-4 text-center">
            Teaching
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            {teachingIntro}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {teachingStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-surface-800 border border-white/5 p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-primary-400">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm mt-2 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const Icon = courseIcons[course.icon as keyof typeof courseIcons];
            return (
              <ScrollReveal key={course.title}>
                <div className="flex flex-col rounded-xl bg-surface-800 border border-white/5 p-6 hover:border-primary-500/30 transition-colors h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="rounded-lg bg-primary-500/10 p-2.5">
                      <Icon size={22} className="text-primary-400" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {course.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 mb-4">
                    {course.subtitle} &middot; {course.schedule}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {course.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {course.links && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                      {course.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-white transition-colors"
                        >
                          {link.label} <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Analogies */}
        <ScrollReveal>
          <h3 className="font-display text-2xl font-bold text-white mt-20 mb-3 text-center">
            Analogies that stick
          </h3>
          <p className="text-slate-500 text-center mb-8">
            Students&apos; favourite analogies from the UNIX course
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {analogies.map((a) => (
            <ScrollReveal key={a.concept}>
              <div className="rounded-xl bg-surface-800 border border-amber-500/10 p-6 h-full">
                <code className="text-sm text-amber-400">{a.concept}</code>
                <p className="text-lg text-white mt-3">{a.marathi}</p>
                <p className="text-sm text-slate-400 mt-1">{a.english}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials */}
        <ScrollReveal>
          <h3 className="font-display text-2xl font-bold text-white mt-20 mb-8 text-center">
            What students say
          </h3>
        </ScrollReveal>

        {featured && (
          <ScrollReveal>
            <figure className="max-w-3xl mx-auto text-center mb-12">
              <Quote size={32} className="text-primary-500/40 mx-auto mb-4" />
              <blockquote className="font-display text-xl md:text-2xl text-white leading-relaxed">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-slate-500 mt-4">
                Student, {featured.course}
              </figcaption>
            </figure>
          </ScrollReveal>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {rest.map((t) => (
            <div key={t.quote} className="break-inside-avoid mb-6">
              <ScrollReveal>
                <figure className="rounded-xl bg-surface-800 border border-white/5 p-6">
                  <blockquote className="text-slate-300 text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-xs text-slate-500 mt-4">
                    {t.course}
                    {t.translated && " · translated from Marathi"}
                  </figcaption>
                </figure>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
