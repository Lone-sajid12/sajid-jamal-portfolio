import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { certificationCategories, certifications } from "@/lib/data";
import { cn } from "@/utils/cn";
import { Reveal, SectionLabel } from "@/components/ui";

export default function Certifications() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(certifications[0]?.title ?? null);

  const filtered = useMemo(
    () => certifications.filter((c) => filter === "All" || c.category === filter),
    [filter]
  );

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <SectionLabel index="01" title="Certifications & Training" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-[clamp(2.4rem,8vw,7rem)] leading-[0.88] tracking-[-0.05em] lg:col-span-8"
          >
            Learning,
            <br />
            <span className="accent-italic text-olive">documented.</span>
          </motion.h1>
          <Reveal delay={0.12} className="lg:col-span-4">
            <p className="max-w-md text-[15px] leading-[1.85] text-ink/70">
              Only programmes that are genuinely completed or in progress appear here. Where a certificate file,
              grade or verification link doesn't exist yet, the entry says so — nothing is invented to fill the
              space.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t rule pt-6">
          {certificationCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={cn(
                "label pb-1 transition-colors duration-400",
                filter === category ? "border-b border-ink text-ink" : "text-ink/45 hover:text-ink/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <ul>
          {filtered.map((cert, index) => {
            const isOpen = open === cert.title;
            return (
              <Reveal key={cert.title} delay={Math.min(index * 0.05, 0.2)}>
                <li className="rule-t">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : cert.title)}
                    className="group grid w-full grid-cols-1 items-baseline gap-3 py-8 text-left transition-colors duration-700 hover:bg-ink md:grid-cols-12 md:gap-6 md:px-4"
                  >
                    <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/45 md:col-span-2">
                      {cert.category}
                    </span>
                    <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] leading-[1.02] tracking-[-0.04em] transition-colors duration-700 group-hover:text-bone md:col-span-6">
                      {cert.title}
                    </h2>
                    <span className="font-mono text-[12px] text-ink/70 transition-colors duration-700 group-hover:text-bone/70 md:col-span-3">
                      {cert.organization}
                    </span>
                    <span className="flex items-baseline gap-3 md:col-span-1 md:justify-end">
                      <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/45">
                        {cert.status === "Completed" ? "Done" : "Ongoing"}
                      </span>
                      <span className="font-display text-xl text-ink transition-colors duration-700 group-hover:text-bone">
                        {isOpen ? "−" : "+"}
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-6 md:px-4">
                          <div className="md:col-span-2">
                            <p className="label text-warmgray">Date</p>
                            <p className="mt-3 font-mono text-[12px] text-ink/75">{cert.date}</p>
                          </div>
                          <div className="md:col-span-5">
                            <p className="label text-warmgray">Skills covered</p>
                            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                              {cert.skills.map((skill) => (
                                <li key={skill} className="text-[13.5px] text-ink/75">
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="md:col-span-5">
                            <p className="label text-warmgray">Verification &amp; certificate</p>
                            <p className="mt-3 max-w-md text-[13.5px] leading-[1.8] text-ink/68">
                              {cert.verifyUrl
                                ? "Verified — open the certificate to confirm the details."
                                : "No public verification link or certificate file yet. It will be added here exactly as issued, without a fabricated ID."}
                            </p>
                            {cert.note && (
                              <p className="mt-4 max-w-md text-[13px] leading-[1.8] text-warmgray">{cert.note}</p>
                            )}
                            {cert.verifyUrl && (
                              <a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="label link-sweep mt-5 inline-block pb-1 text-ink"
                              >
                                Verify certificate ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="rule-t py-16 text-center">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] tracking-[-0.04em]">
              Nothing in this category yet.
            </h2>
            <p className="mt-4 text-[14.5px] text-ink/60">
              This stays empty until a real, verifiable certificate exists for it.
            </p>
            <button type="button" onClick={() => setFilter("All")} className="label link-sweep mt-8 pb-1 text-ink">
              Show all
            </button>
          </div>
        )}

        <div className="rule-t mt-16 grid gap-8 pt-8 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.05] tracking-[-0.04em] lg:col-span-5">
            Learning in progress,
            <br />
            <span className="accent-italic text-olive">listed without decoration.</span>
          </h2>
          <ul className="space-y-4 lg:col-span-7">
            {[
              "Every entry maps to the skills genuinely covered by that programme.",
              "Coursework, self-study and training are labelled as such — not as job experience.",
              "New certifications are appended here as they are completed, with verification when available.",
            ].map((line) => (
              <li key={line} className="flex gap-4 text-[14.5px] leading-[1.85] text-ink/72">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
