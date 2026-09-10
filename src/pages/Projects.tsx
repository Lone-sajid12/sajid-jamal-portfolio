import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projectCategories, projects, profile } from "@/lib/data";
import { cn } from "@/utils/cn";
import { ParallaxImage, Reveal, SectionLabel } from "@/components/ui";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.category === filter;
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <SectionLabel index="01" title="Projects" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-[-0.05em] lg:col-span-7"
          >
            Projects
          </motion.h1>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.85] text-ink/70">
              A working archive of {projects.length} builds. Every project is a learning build with a written case
              study — the problem, the data, the process, the technology, the honest result and what I took from it.
              No invented metrics, no fake clients.
            </p>
          </Reveal>
        </div>

        {/* filters + search */}
        <div className="mt-14 flex flex-col gap-6 border-t rule pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={cn(
                  "label pb-1 transition-colors duration-400",
                  filter === category
                    ? "border-b border-ink text-ink"
                    : "text-ink/45 hover:text-ink/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 lg:w-72">
            <span className="label shrink-0 text-warmgray">Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="title, tool, field…"
              aria-label="Search projects"
              className="w-full border-b border-ink/20 bg-transparent pb-2 text-[13.5px] text-ink placeholder-ink/35 outline-none transition-colors focus:border-ink"
            />
          </label>
        </div>

        <p className="label mt-6 text-warmgray">
          {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "build" : "builds"}
          {filter !== "All" && ` — ${filter}`}
          {query && ` — “${query}”`}
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const globalIndex = projects.findIndex((p) => p.slug === project.slug);
            const flipped = globalIndex % 2 === 1;
            return (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.2), ease: [0.19, 1, 0.22, 1] }}
                className="rule-t grid gap-8 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div
                  className={cn(
                    "lg:col-span-5 lg:self-start",
                    flipped ? "lg:order-2" : "lg:order-1",
                    "lg:sticky lg:top-28"
                  )}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="label text-warmgray">Project {String(globalIndex + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-ink/12" />
                    <span className="label text-olive">{project.category}</span>
                  </div>

                  <h2 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[0.98] tracking-[-0.045em]">
                    {project.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[14.5px] leading-[1.85] text-ink/70">{project.summary}</p>

                  <dl className="mt-8 space-y-3 border-t rule pt-6">
                    <div className="flex items-baseline gap-4">
                      <dt className="label w-16 text-warmgray">Tools</dt>
                      <dd className="font-mono text-[12px] text-ink/75">{project.tech.join(" / ")}</dd>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <dt className="label w-16 text-warmgray">State</dt>
                      <dd className="font-mono text-[12px] text-ink/75">{project.status}</dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap items-center gap-7">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group inline-flex items-center gap-3 font-mono text-[10.5px] tracking-[0.22em] text-ink uppercase"
                    >
                      <span className="link-sweep pb-1">View case study</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="label link-sweep pb-1 text-ink/60"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className={cn("lg:col-span-7", flipped ? "lg:order-1" : "lg:order-2")}>
                  <Link to={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>
                    <ParallaxImage
                      src={project.image ?? ""}
                      alt={`${project.title} — ${project.category} build`}
                      ratio={globalIndex % 3 === 1 ? "aspect-[4/3]" : "aspect-[16/10]"}
                      shift={24}
                    />
                    <p className="label mt-4 text-warmgray">
                      Fig. {String(globalIndex + 1).padStart(2, "0")} — {project.year} · learning build artefact
                    </p>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="rule-t py-16 text-center">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] tracking-[-0.04em]">
              Nothing matches that search yet.
            </h2>
            <p className="mt-4 text-[14.5px] text-ink/60">
              Try another field or clear the search — new builds get added here as I finish them.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
              className="label link-sweep mt-8 pb-1 text-ink"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="rule-t grid gap-8 pt-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1] tracking-[-0.04em] lg:col-span-7">
            The notebooks behind
            <br />
            these write-ups live on <span className="accent-italic text-olive">GitHub.</span>
          </h2>
          <div className="lg:col-span-5">
            <p className="max-w-md text-[14.5px] leading-[1.85] text-ink/70">
              Some are finished, some are clearly marked in progress — that's the honest state of a student
              portfolio, and it's more useful than a wall of polished screenshots.
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-sweep mt-6 inline-block pb-1 font-mono text-[10.5px] tracking-[0.22em] text-ink uppercase"
            >
              github.com/{profile.githubHandle} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
