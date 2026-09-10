import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, profile } from "@/lib/data";
import { ParallaxImage, Reveal, SectionLabel } from "@/components/ui";

const sections = [
  { key: "problem", label: "The Problem" },
  { key: "data", label: "The Data" },
  { key: "process", label: "The Process" },
  { key: "technology", label: "The Technology" },
  { key: "result", label: "The Result" },
  { key: "learning", label: "What I Learned" },
] as const;

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!project) {
    return (
      <section className="mx-auto max-w-[1600px] px-5 pt-40 md:px-10">
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
          Case study not found.
        </h1>
        <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-ink/65">
          That project may have been renamed. The full archive is one click away.
        </p>
        <Link to="/projects" className="label link-sweep mt-8 inline-block pb-1 text-ink">
          Back to projects →
        </Link>
      </section>
    );
  }

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const content = project.caseStudy;

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <Link to="/projects" className="label link-sweep inline-block pb-1 text-warmgray hover:text-ink">
          ← All projects
        </Link>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label text-olive">
              Case study — {project.category} · {project.status}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,7.5vw,6rem)] leading-[0.9] tracking-[-0.05em]">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[14.5px] leading-[1.85] text-ink/70">{project.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-sweep pb-1 text-ink"
                >
                  GitHub ↗
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-sweep pb-1 text-ink"
                >
                  Live demo ↗
                </a>
              ) : (
                <span className="label text-warmgray">Live demo not published</span>
              )}
            </div>
          </div>
        </div>

        <Reveal delay={0.06}>
          <dl className="mt-14 grid gap-x-10 gap-y-5 border-t rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label text-warmgray">Field</dt>
              <dd className="mt-3 font-mono text-[12.5px] text-ink/80">{project.category}</dd>
            </div>
            <div>
              <dt className="label text-warmgray">Year</dt>
              <dd className="mt-3 font-mono text-[12.5px] text-ink/80">{project.year}</dd>
            </div>
            <div>
              <dt className="label text-warmgray">State</dt>
              <dd className="mt-3 font-mono text-[12.5px] text-ink/80">{project.status}</dd>
            </div>
            <div>
              <dt className="label text-warmgray">Stack</dt>
              <dd className="mt-3 font-mono text-[12.5px] text-ink/80">{project.tech.join(" / ")}</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* full-bleed image */}
      {project.image && (
        <div className="mt-16 md:mt-20">
          <ParallaxImage
            src={project.image}
            alt={`${project.title} — project visual`}
            ratio="aspect-[16/9] lg:aspect-[21/9]"
            shift={34}
            scale={1.18}
          />
          <p className="mx-auto mt-4 max-w-[1600px] px-5 label text-warmgray md:px-10">
            Fig. A — learning build artefact, not a production deployment
          </p>
        </div>
      )}

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <SectionLabel index="02" title="Case Study" />

        <div className="mt-12 space-y-16 md:space-y-24">
          {sections.map((section, i) => {
            const value = content[section.key];
            return (
              <div key={section.key} className="grid gap-6 border-t rule pt-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <p className="label text-warmgray">{String(i + 1).padStart(2, "0")} —</p>
                  <h2 className="mt-4 font-display text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.05] tracking-[-0.035em]">
                    {section.label}
                  </h2>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  {Array.isArray(value) ? (
                    <ol className="space-y-5">
                      {value.map((step, stepIndex) => (
                        <li key={step} className="flex gap-5">
                          <span className="label pt-1.5 text-warmgray">
                            {String(stepIndex + 1).padStart(2, "0")}
                          </span>
                          <p className="max-w-2xl text-[15px] leading-[1.9] text-ink/75">{step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="max-w-2xl text-[15.5px] leading-[1.9] text-ink/78">{value as string}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.06}>
          <p className="label mt-16 border-t rule pt-8 text-warmgray">
            Honest note — this is a learning build. The result describes what was produced and documented, not
            business impact, user numbers or production accuracy.
          </p>
        </Reveal>
      </section>

      {/* next project */}
      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="rule-t grid gap-8 pt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-warmgray">Next case study</p>
            <Link to={`/projects/${next.slug}`} className="group mt-5 inline-block">
              <h2 className="font-display text-[clamp(2rem,5.5vw,4.4rem)] leading-[0.95] tracking-[-0.045em]">
                {next.title}
                <span className="ml-4 inline-block transition-transform duration-700 group-hover:translate-x-3">→</span>
              </h2>
            </Link>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-[14.5px] leading-[1.85] text-ink/70">
              Want to talk about this build, or suggest something I should try next? Send me a note — I read
              everything.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="label link-sweep mt-6 inline-block pb-1 text-ink"
            >
              {profile.email} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
