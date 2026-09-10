import { motion } from "framer-motion";
import { journey } from "@/lib/data";
import { cn } from "@/utils/cn";
import { Reveal, SectionLabel } from "./ui";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Journey as a typographic progression — big serif stages, slow reveals and
 * hairline rows. No cards, no timeline chrome.
 */
export function JourneyProgression({ index = "06" }: { index?: string }) {
  return (
    <section id="journey" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index={index} title="The Journey" />

      <Reveal>
        <h2 className="mt-12 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.94] tracking-[-0.045em]">
          One direction.
          <br />
          <span className="accent-italic text-olive">Every stage builds on the last.</span>
        </h2>
      </Reveal>

      <div className="mt-16">
        {journey.map((stage, i) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: Math.min(i * 0.04, 0.2), ease: EASE }}
            className="group rule-t grid gap-4 py-8 transition-colors duration-700 hover:bg-ink md:grid-cols-12 md:items-baseline md:gap-6 md:px-4 md:py-10"
          >
            <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/50 md:col-span-2">
              {stage.year}
            </span>

            <h3
              className={cn(
                "font-display text-[clamp(1.8rem,4.6vw,3.2rem)] leading-none tracking-[-0.04em] transition-colors duration-700 group-hover:text-bone md:col-span-4",
                i === journey.length - 1 && "text-olive transition-colors group-hover:text-bone"
              )}
            >
              {stage.title}
            </h3>

            <p className="max-w-xl text-[14.5px] leading-[1.8] text-ink/70 transition-colors duration-700 group-hover:text-bone/75 md:col-span-5">
              {stage.text}
            </p>

            <span className="label hidden text-right text-warmgray transition-colors duration-700 group-hover:text-bone/45 md:col-span-1 md:block">
              {i < journey.length - 1 ? "↓" : "★"}
            </span>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.08}>
        <p className="label mt-10 text-warmgray">
          Learn something → build with it → write down what broke. Repeat.
        </p>
      </Reveal>
    </section>
  );
}
