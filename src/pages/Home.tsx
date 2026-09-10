import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { JourneyProgression } from "@/components/JourneyTimeline";
import { Pipeline } from "@/components/Pipeline";
import { GitHubPanel } from "@/components/GitHubPanel";
import { AboutTeaser, FocusList, ResumeStrip, SkillsEditorial, Statement } from "@/components/sections";
import { aboutParagraphs, projects } from "@/lib/data";
import { ParallaxImage, Reveal, SectionLabel } from "@/components/ui";

function SelectedWork() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="05" title="Selected Work" />

      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
            Work that shows
            <br />
            <span className="accent-italic text-olive">how I think.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-sm text-[14.5px] leading-[1.8] text-ink/65">
            Three builds from the archive. Each one is documented like an editorial feature: the problem, the data,
            the process and an honest result.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 space-y-20 md:space-y-28">
        {projects.slice(0, 3).map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="grid gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div
              className={
                index % 2 === 1
                  ? "lg:col-span-5 lg:order-2 lg:sticky lg:top-28 lg:self-start"
                  : "lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
              }
            >
              <p className="label text-warmgray">Project {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.02] tracking-[-0.04em]">
                {project.title}
              </h3>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.8] text-ink/70">{project.summary}</p>

              <dl className="mt-7 space-y-3 border-t rule pt-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <dt className="label w-20 text-warmgray">Field</dt>
                  <dd className="font-mono text-[12px] text-ink/75">{project.category}</dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <dt className="label w-20 text-warmgray">Tools</dt>
                  <dd className="font-mono text-[12px] text-ink/75">{project.tech.join(" / ")}</dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <dt className="label w-20 text-warmgray">State</dt>
                  <dd className="font-mono text-[12px] text-ink/75">{project.status}</dd>
                </div>
              </dl>

              <Link
                to={`/projects/${project.slug}`}
                className="group mt-7 inline-flex items-center gap-3 font-mono text-[10.5px] tracking-[0.22em] text-ink uppercase"
              >
                <span className="link-sweep pb-1">View case study</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </Link>
            </div>

            <div className={index % 2 === 1 ? "lg:col-span-7 lg:order-1" : "lg:col-span-7"}>
              <Link to={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>
                <ParallaxImage
                  src={project.image ?? ""}
                  alt={`${project.title} — ${project.category} learning build`}
                  ratio="aspect-[16/11]"
                  shift={22}
                />
                <p className="label mt-4 flex items-center justify-between text-warmgray">
                  <span>
                    Fig. {String(index + 1).padStart(2, "0")} — {project.year}
                  </span>
                  <span className="text-ink/60">Open case study →</span>
                </p>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <Reveal delay={0.06}>
        <div className="mt-20 flex flex-wrap items-center gap-8 border-t rule pt-8">
          <Link to="/projects" className="label link-sweep pb-1 text-ink">
            All projects →
          </Link>
          <Link to="/certifications" className="label link-sweep pb-1 text-ink">
            Certifications →
          </Link>
          <Link to="/journey" className="label link-sweep pb-1 text-ink">
            The journey →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <AboutTeaser paragraphs={aboutParagraphs} />
      <SkillsEditorial />
      <Pipeline />
      <SelectedWork />
      <JourneyProgression />
      <FocusList />
      <GitHubPanel />
      <ResumeStrip />
      <ContactSection />
    </>
  );
}
