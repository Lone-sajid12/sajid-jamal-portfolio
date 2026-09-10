import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { pipelineStages } from "@/lib/data";
import { cn } from "@/utils/cn";
import { Reveal, SectionLabel } from "./ui";

const EASE = [0.19, 1, 0.22, 1] as const;

function Stage({
  index,
  label,
  detail,
  tools,
  isLast,
  onEnter,
}: {
  index: number;
  label: string;
  detail: string;
  tools: string;
  isLast: boolean;
  onEnter: (index: number) => void;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => {
        setActive(true);
        onEnter(index);
      }}
      viewport={{ amount: 0.6, margin: "-20% 0px -30% 0px" }}
      className="rule-t grid gap-4 py-10 md:grid-cols-12 md:gap-6 md:py-14"
    >
      <span className="label pt-2 text-warmgray md:col-span-1">{String(index + 1).padStart(2, "0")}</span>

      <motion.h3
        animate={{ opacity: active ? 1 : 0.32, x: active ? 0 : -6 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="font-display text-[clamp(2.1rem,5.6vw,4rem)] leading-[0.95] tracking-[-0.04em] md:col-span-4"
      >
        {label}
      </motion.h3>

      <motion.div
        animate={{ opacity: active ? 1 : 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="md:col-span-5"
      >
        <p className="max-w-xl text-[14.5px] leading-[1.8] text-ink/70">{detail}</p>
        <p className="label mt-4 text-olive">{tools}</p>
      </motion.div>

      <div className="hidden md:col-span-2 md:flex md:justify-end">
        {!isLast && (
          <motion.span
            animate={{ opacity: active ? 0.5 : 0.15, y: active ? 0 : -4 }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl text-ink"
          >
            ↓
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

/** Signature section: an editorial, scroll-driven Data → Intelligence sequence. */
export function Pipeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.6", "end 0.85"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="pipeline" className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="04" title="Data → Intelligence" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-[-0.04em]">
              From raw data
              <br />
              to <span className="accent-italic text-olive">real impact.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-ink/70">
              Eight stages I work through on every dataset. They don't run in parallel and they don't skip — the
              quality of the prediction is decided long before any model is trained.
            </p>
          </Reveal>

          <div className="mt-12 hidden lg:block">
            <div ref={railRef} className="relative pl-5">
              <div className="absolute top-0 left-0 h-full w-px bg-ink/12" />
              <motion.div
                style={{ height: fillHeight }}
                className="absolute top-0 left-0 w-px bg-olive"
              />
              <ul className="space-y-3.5">
                {pipelineStages.map((stage, index) => (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "label flex items-center gap-3 transition-all duration-500",
                        activeIndex === index ? "translate-x-1 text-ink" : "text-warmgray hover:text-ink/70"
                      )}
                    >
                      <span className={cn("h-px transition-all duration-500", activeIndex === index ? "w-5 bg-olive" : "w-3 bg-ink/25")} />
                      {stage.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {pipelineStages.map((stage, index) => (
            <Stage
              key={stage.id}
              index={index}
              label={stage.label}
              detail={stage.detail}
              tools={stage.tools}
              isLast={index === pipelineStages.length - 1}
              onEnter={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
