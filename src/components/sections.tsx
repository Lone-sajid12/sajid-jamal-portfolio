import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { currentFocus, levelStyles, profile, skillCategories } from "@/lib/data";
import { downloadResume, viewResume } from "@/lib/resume";
import { cn } from "@/utils/cn";
import { ArrowButton, Reveal, ScrollWords, SectionLabel } from "./ui";

/* ───────────────────────────── statement block ───────────────────────── */

export function Statement() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="01" title="Statement" />
      <ScrollWords
        text="I'm learning to see the story behind the data — because a number on its own explains nothing, and a decision made without understanding it usually costs more than the analysis would have."
        highlight={["story", "behind", "the", "data"]}
        className="mt-12 max-w-5xl font-display text-[clamp(1.9rem,5.2vw,4.2rem)] leading-[1.06] tracking-[-0.035em]"
      />
      <Reveal delay={0.1}>
        <div className="mt-14 grid gap-8 border-t rule pt-8 md:grid-cols-3">
          <p className="label text-warmgray">Data Analytics — SQL · Python · Excel</p>
          <p className="label text-warmgray">Data Science — Statistics · EDA · ML</p>
          <p className="label text-warmgray">AI · Automation — Workflows &amp; systems</p>
        </div>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────── skills ───────────────────────────── */

export function SkillsEditorial() {
  return (
    <section id="skills" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="03" title="Skills & Tools" />

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[0.98] tracking-[-0.04em]">
            What I actually
            <br />
            <span className="accent-italic text-olive">use today.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[14.5px] leading-[1.8] text-ink/65">
            No percentage bars — they would be invented. Each entry is honest about where I am: confident,
            actively building, or still exploring.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {skillCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
              className="group rule-t grid cursor-default gap-3 py-7 transition-colors duration-700 hover:bg-ink md:grid-cols-12 md:items-baseline md:gap-6 md:px-4"
            >
              <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/50 md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-none tracking-[-0.03em] transition-colors duration-700 group-hover:text-bone md:col-span-3">
                {group.category}
              </h3>
              <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:col-span-7">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline gap-2 text-[14.5px] text-ink/80 transition-colors duration-700 group-hover:text-bone/90"
                  >
                    {skill.name}
                    <span
                      className={cn(
                        "label text-[9px] transition-colors duration-700 group-hover:text-bone/45",
                        levelStyles[skill.level]
                      )}
                    >
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
              <span className="label hidden text-warmgray transition-colors duration-700 group-hover:text-bone/40 md:col-span-1 md:block md:text-right">
                →
              </span>
            </motion.div>
          ))}
          <p className="label mt-6 text-warmgray">
            Honest note — "exploring" means I've started reading and experimenting, not that I'd claim production
            experience.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── currently exploring list ───────────────────── */

export function FocusList({ index = "07" }: { index?: string }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-28">
      <SectionLabel index={index} title="Currently Exploring" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1] tracking-[-0.04em]">
            Where my attention
            <br />
            <span className="accent-italic text-olive">sits right now.</span>
          </h2>
        </Reveal>

        <ul className="lg:col-span-8">
          {currentFocus.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: index * 0.04 }}
              className="rule-t flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
            >
              <div className="flex items-baseline gap-5">
                <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-olive" />
                <h3 className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-none tracking-[-0.03em]">
                  {item.title}
                </h3>
              </div>
              <p className="ml-6 text-[13.5px] leading-relaxed text-warmgray md:ml-0 md:max-w-sm md:text-right">
                {item.note}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      <Reveal delay={0.08}>
        <p className="label mt-8 text-warmgray">Progress on these areas is deliberately not scored — the work is.</p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────── resume strip ────────────────────────── */

export function ResumeStrip() {
  return (
    <section className="relative z-10 bg-charcoal text-bone">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-bone/45">Resume</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.94] tracking-[-0.04em]">
              One page.
              <br />
              <span className="accent-italic text-bone/70">Honest content.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-[14.5px] leading-[1.8] text-bone/65">
              Education, career direction, learning builds and certifications — generated as a real PDF from this
              portfolio, so the document and the site never disagree. No inflated titles inside it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ArrowButton variant="light" onClick={() => downloadResume()} showArrow={false}>
                Download Resume ↓
              </ArrowButton>
              <button
                type="button"
                onClick={() => viewResume()}
                className="label text-bone/60 transition-colors hover:text-bone"
              >
                View Resume ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── about teaser (home) ─────────────────────── */

export function AboutTeaser({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="02" title="About" />
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display text-[clamp(2.1rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em]">
              I'm learning to see the
              <br />
              <span className="accent-italic text-olive">story behind the data.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-12 space-y-6 border-t rule pt-8">
              <div className="grid grid-cols-[7rem_1fr] gap-4">
                <dt className="label text-warmgray">Education</dt>
                <dd className="text-[14px] text-ink/75">
                  {profile.education.degree}
                  <br />
                  <span className="text-warmgray">
                    {profile.education.institute} • {profile.education.years}
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4">
                <dt className="label text-warmgray">Based in</dt>
                <dd className="text-[14px] text-ink/75">{profile.location}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4">
                <dt className="label text-warmgray">Direction</dt>
                <dd className="text-[14px] text-ink/75">Data Analytics → Data Science → AI/ML → Automation</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
          {paragraphs.slice(0, 2).map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 20)} delay={index * 0.06}>
              <p className="mb-6 text-[15.5px] leading-[1.9] text-ink/75">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.14}>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                className="label link-sweep pb-1 text-ink transition-colors hover:text-olive"
              >
                Read the full story
              </Link>
              <ArrowButton variant="link" href={profile.linkedin}>
                LinkedIn
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
