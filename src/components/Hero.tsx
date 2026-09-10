import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { downloadResume } from "@/lib/resume";
import { usePointerParallax } from "@/lib/hooks";
import { Portrait } from "./Portrait";
import { ArrowButton, Marquee } from "./ui";

const headline = [
  { text: "Turning data", italic: false },
  { text: "into better", italic: false },
  { text: "decisions.", italic: true },
];

const marqueeItems = [
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Automation",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const { pointer } = usePointerParallax(1);

  return (
    <section ref={ref} className="relative pt-28 md:pt-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── typography ── */}
          <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <span className="label text-ink">Sajid Jamal</span>
              <span className="label text-warmgray">Data → Intelligence</span>
              <span className="label text-warmgray">Srinagar, J&amp;K — India</span>
            </motion.div>

            <h1 className="mt-8 md:mt-10">
              {headline.map((line, index) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "112%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.25, delay: 0.25 + index * 0.12, ease: [0.19, 1, 0.22, 1] }}
                    className={
                      line.italic
                        ? "accent-italic block font-display text-[clamp(2.5rem,11.5vw,10.5rem)] leading-[0.9] tracking-[-0.045em] text-olive"
                        : "block font-display text-[clamp(2.5rem,11.5vw,10.5rem)] leading-[0.9] tracking-[-0.045em]"
                    }
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
              className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end lg:max-w-3xl"
            >
              <p className="text-[15.5px] leading-[1.75] text-ink/70 md:text-[16.5px]">
                I'm Sajid Jamal, a Computer science student from Srinagar exploring Data Analytics, Data Science, AI/ML and
                Automation — building practical projects while continuously turning what I learn into something
                real.
              </p>
              <div className="flex flex-col items-start gap-5">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-[10.5px] tracking-[0.22em] text-bone uppercase transition-colors duration-500 hover:bg-charcoal"
                >
                  Explore my work
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
                <ArrowButton variant="link" onClick={() => downloadResume()} showArrow={false}>
                  Download Resume ↓
                </ArrowButton>
              </div>
            </motion.div>
          </motion.div>

          {/* ── photograph ── */}
          <motion.div
            style={{ y: imageY, opacity: fade }}
            className="relative lg:col-span-5 lg:-mt-24 xl:-mt-32"
          >
            <div
              style={{
                transform: `translate3d(${pointer.x * 6}px, ${pointer.y * -5}px, 0)`,
                transition: "transform 800ms cubic-bezier(0.19,1,0.22,1)",
              }}
            >
              <Portrait />
            </div>
          </motion.div>
        </div>

        {/* ── closing meta strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 grid gap-6 border-t rule pt-6 md:mt-20 md:grid-cols-3"
        >
          <p className="label text-warmgray">UG Computer Applications — IITM&amp;Srinagar</p>
          <p className="label text-warmgray">Path — Analytics → Science → AI/ML → Automation</p>
          <p className="label text-warmgray md:text-right">
            Scroll <span className="text-ink">↓</span>
          </p>
        </motion.div>
      </div>

      <Marquee
        items={marqueeItems}
        className="mt-16 border-y rule py-6 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] tracking-[-0.03em] text-ink/45 md:mt-20"
        duration={54}
      />
    </section>
  );
}
