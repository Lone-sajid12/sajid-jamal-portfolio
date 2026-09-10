import { aboutParagraphs, profile } from "@/lib/data";
import { JourneyProgression } from "@/components/JourneyTimeline";
import { FocusList, ResumeStrip } from "@/components/sections";
import { Reveal, RevealLines, SectionLabel } from "@/components/ui";
import { downloadResume, viewResume } from "@/lib/resume";

const meta = [
  { label: "Name", value: profile.name },
  { label: "Base", value: "Srinagar, J&K — India" },
  { label: "Position", value: profile.position },
  { label: "Education", value: `${profile.education.institute} · ${profile.education.years}` },
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <SectionLabel index="01" title="About" />

        <RevealLines
          as="h1"
          lines={["I'm learning to see the"]}
          className="mt-12 font-display text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.045em]"
        />
        <RevealLines
          as="p"
          delay={0.12}
          lines={["story behind the data."]}
          className="accent-italic font-display text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.045em] text-olive"
        />

        <Reveal delay={0.1}>
          <dl className="mt-16 grid gap-x-10 gap-y-6 border-t rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label text-warmgray">{item.label}</dt>
                <dd className="mt-3 text-[14px] leading-relaxed text-ink/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="label text-warmgray">In my own words</p>
              <p className="mt-6 max-w-xs font-display text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.15] tracking-[-0.03em] text-ink">
                A student, not a professional — and I'd rather show you the process than pretend otherwise.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => downloadResume()}
                  className="label link-sweep w-fit pb-1 text-ink"
                >
                  Download resume ↓
                </button>
                <button
                  type="button"
                  onClick={() => viewResume()}
                  className="label link-sweep w-fit pb-1 text-ink"
                >
                  View resume ↗
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-sweep w-fit pb-1 text-ink"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {aboutParagraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={Math.min(index * 0.03, 0.12)}>
                <p
                  className={
                    index === 0
                      ? "mb-8 text-[17.5px] leading-[1.85] text-ink/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.82] first-letter:tracking-[-0.04em]"
                      : "mb-7 text-[15.5px] leading-[1.9] text-ink/72"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <blockquote className="mt-14 border-t rule pt-8">
                <p className="max-w-2xl font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.12] tracking-[-0.035em]">
                  "The direction is clear, the work has started, and every project from here is a step further down
                  the data pipeline."
                </p>
                <footer className="label mt-6 text-warmgray">Sajid Jamal — UG Computer Applications, 2025–2028</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <JourneyProgression index="03" />
      <FocusList index="04" />
      <ResumeStrip />
    </>
  );
}
