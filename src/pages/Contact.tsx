import { ContactSection } from "@/components/ContactSection";
import { profile } from "@/lib/data";
import { Reveal, SectionLabel } from "@/components/ui";
import { downloadResume, viewResume } from "@/lib/resume";

const notes = [
  {
    title: "What I reply to",
    lines: [
      "Internship and trainee opportunities in data, analytics or AI.",
      "Student hackathons and open-source collaboration.",
      "Project feedback — especially the critical kind.",
    ],
  },
  {
    title: "What I'm upfront about",
    lines: [
      "I'm currently a Computer science student, so coursework sets my availability.",
      "I take on work I can finish honestly rather than over-promise.",
      "Everything I share is labelled for what it is: a learning build.",
    ],
  },
];

export default function Contact() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
        <SectionLabel index="01" title="Contact" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.88] tracking-[-0.05em]">
                Let's build
                <br />
                something
                <br />
                <span className="accent-italic text-olive">intelligent.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-xl text-[15.5px] leading-[1.85] text-ink/72">
                Based in {profile.location}, working in Python, SQL and notebooks most days. Whether you're a
                recruiter, a mentor or another student who wants to build something with data — send a message and
                tell me what you're trying to make sense of.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center gap-7">
                <button
                  type="button"
                  onClick={() => downloadResume()}
                  className="label link-sweep pb-1 text-ink"
                >
                  Download resume ↓
                </button>
                <button type="button" onClick={() => viewResume()} className="label link-sweep pb-1 text-ink">
                  View resume ↗
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label link-sweep pb-1 text-ink"
                >
                  GitHub ↗
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {notes.map((block, index) => (
                <Reveal key={block.title} delay={0.08 + index * 0.06}>
                  <div className="rule-t pt-5">
                    <p className="label text-warmgray">{block.title}</p>
                    <ul className="mt-5 space-y-3">
                      {block.lines.map((line) => (
                        <li key={line} className="flex gap-4 text-[13.5px] leading-[1.8] text-ink/72">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <section className="bg-ink text-bone">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="label text-bone/45">{profile.email}</p>
          <p className="label text-bone/45">
            {profile.location} — open to remote internships and collaborations
          </p>
        </div>
      </section>
    </>
  );
}
