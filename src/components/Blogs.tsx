import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Blogs() {
  return (
    <section id="blogs" className="py-24 px-6 bg-surface-800/40">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">
            Writing
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <ScrollReveal key={post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl bg-surface-800 border border-white/5 p-6 hover:border-primary-500/30 transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      post.language === "Marathi"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {post.language}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-600 group-hover:text-primary-400 transition-colors"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.description}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
