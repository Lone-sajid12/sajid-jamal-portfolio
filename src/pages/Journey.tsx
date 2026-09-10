import { motion } from "framer-motion";
import { JourneyProgression } from "@/components/JourneyTimeline";
import { Pipeline } from "@/components/Pipeline";
import { FocusList, ResumeStrip } from "@/components/sections";
import { profile } from "@/lib/data";
import { Reveal, RevealLines, SectionLabel } from "@/components/ui";
import { downloadResume } from "@/lib/resume";

export default function Journey() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <SectionLabel index="01" title="Journey" />

        <RevealLines
          lines={["Data Analytics", "is only the", "beginning."]}
          className="mt-12 font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.88] tracking-[-0.05em]"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="max-w-xl text-[16px] leading-[1.85] text-ink/75">
                My path runs in one direction: Data Analytics → Data Science → Machine Learning → AI → Automation.
                Each stage teaches something the next one depends on, and nothing here is a claim of expertise —
                it's an honest record of where I am and what I'm building toward.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.16}>
              <dl className="space-y-5 border-t rule pt-8">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-warmgray">Started</dt>
                  <dd className="font-mono text-[12.5px] text-ink/80">2025 — UG Computer Applications</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-warmgray">Current focus</dt>
                  <dd className="font-mono text-[12.5px] text-ink/80">Analytics · ML · Automation</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-warmgray">Graduating</dt>
                  <dd className="font-mono text-[12.5px] text-ink/80">2028</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-warmgray">Ambition</dt>
                  <dd className="font-mono text-[12.5px] text-ink/80">Data Scientist</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => downloadResume()}
                className="label link-sweep mt-8 inline-block pb-1 text-ink"
              >
                Download resume ↓
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* progression flow */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
        <SectionLabel index="02" title="The Sequence" />
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {["Data Analytics", "Data Science", "Machine Learning", "AI", "Automation"].map((stage, index) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
              className="rule-t pt-5"
            >
              <p className="label text-warmgray">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.05] tracking-[-0.035em]">
                {stage}
              </h3>
              {index < 4 && <span className="label mt-5 block text-ink/40">↓</span>}
            </motion.div>
          ))}
        </div>
      </section>

      <JourneyProgression index="03" />
      <Pipeline />
      <FocusList index="05" />

      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="rule-t grid gap-8 pt-10 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(1.8rem,4.4vw,3.2rem)] leading-[1.02] tracking-[-0.04em] lg:col-span-6">
            Education sits alongside
            <br />
            <span className="accent-italic text-olive">the work I do on my own.</span>
          </h2>
          <div className="lg:col-span-6">
            <p className="text-[14.5px] leading-[1.85] text-ink/72">
              {profile.education.degree}
              <br />
              <span className="text-warmgray">
                {profile.education.institute} — {profile.education.place} · {profile.education.years}
              </span>
            </p>
            <p className="mt-5 max-w-xl text-[14.5px] leading-[1.85] text-ink/68">
              Coursework in programming fundamentals, computer systems and mathematics runs next to the data work I
              do in the evenings. That combination — formal study plus self-directed building — is what I want to
              turn into an engineering-grade skill set.
            </p>
          </div>
        </div>
      </section>

      <ResumeStrip />
    </>
  );
}
