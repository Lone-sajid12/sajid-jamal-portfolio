import { motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/lib/data";
import { useLowPower, usePointerParallax } from "@/lib/hooks";

/**
 * Cinematic editorial portrait: large arch-cropped frame, slow breathing
 * movement, cursor-driven depth and a clip-path reveal. No rings, no glow —
 * the photograph carries the composition.
 */
export function Portrait() {
  const { ref, pointer } = usePointerParallax<HTMLDivElement>(1);
  const lowPower = useLowPower();
  const [failed, setFailed] = useState(false);

  return (
    <div ref={ref} className="relative w-full select-none">
      <MaskedFrame>
        <div className="relative h-full w-full overflow-hidden bg-sand">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-bone-deep">
              <span className="font-display text-7xl leading-none text-ink">SJ</span>
              <span className="label max-w-[16rem] text-center leading-relaxed text-warmgray">
                Add your photograph at /public/mypic.png
              </span>
            </div>
          ) : (
            <div
              className="h-full w-full"
              style={{
                transform: `translate3d(${pointer.x * -9}px, ${pointer.y * -7}px, 0)`,
                transition: "transform 800ms cubic-bezier(0.19,1,0.22,1)",
              }}
            >
              <motion.img
                src={profile.photo}
                alt={`${profile.name} — Computer science student from Srinagar, Jammu & Kashmir`}
                loading="eager"
                decoding="async"
                onError={() => setFailed(true)}
                initial={{ scale: 1.16 }}
                animate={{ scale: lowPower ? 1.04 : [1.06, 1.035, 1.06] }}
                transition={
                  lowPower
                    ? { duration: 1.4, ease: [0.19, 1, 0.22, 1] }
                    : { duration: 14, repeat: Infinity, ease: "easeInOut" }
                }
                className="media h-full w-full object-cover object-[50%_18%]"
              />
            </div>
          )}
          {/* print-style tonal wash, never on the face */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0) 46%, rgba(17,17,17,0.16) 82%, rgba(17,17,17,0.3) 100%)",
            }}
          />
        </div>
      </MaskedFrame>

      <div className="mt-5 flex items-start justify-between gap-6">
        <p className="label text-warmgray">Portrait — Srinagar, J&amp;K</p>
        <p className="label text-right text-ink/60">UG 2025 — 2028</p>
      </div>
    </div>
  );
}

/** Arch crop with a clip-path reveal, so the photo feels placed rather than boxed. */
function MaskedFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.5, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
      className="relative aspect-[4/5] w-full overflow-hidden"
      style={{ borderRadius: "min(14rem, 42vw) min(14rem, 42vw) 2px 2px" }}
    >
      {children}
    </motion.div>
  );
}
