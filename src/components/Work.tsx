import { ArrowUpRight, FileText } from "lucide-react";
import { workItems, researchPapers } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Work() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">
            Work &amp; Experience
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {workItems.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="rounded-xl bg-surface-800 border border-white/5 p-6 hover:border-primary-500/30 transition-colors h-full">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  {"period" in item && (
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-3 mt-1">
                      {item.period}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {"scholarUrl" in item && item.scholarUrl && (
                  <a
                    href={item.scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    Google Scholar <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Research Papers */}
        <ScrollReveal>
          <h3 className="font-display text-2xl font-bold text-white mt-16 mb-8 text-center">
            Publications
          </h3>
        </ScrollReveal>

        <div className="space-y-4 max-w-4xl mx-auto">
          {researchPapers.map((paper) => (
            <ScrollReveal key={paper.title}>
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl bg-surface-800 border border-white/5 p-5 hover:border-primary-500/30 transition-colors"
              >
                <FileText
                  size={20}
                  className="text-primary-400 mt-0.5 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium leading-snug">
                    {paper.title}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">{paper.venue}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-slate-600 group-hover:text-primary-400 transition-colors shrink-0 mt-1"
                />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
