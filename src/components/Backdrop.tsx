import { useEffect, useState } from "react";
import { useIsMobile, useReducedMotion, useScrollProgress } from "@/lib/hooks";

/** Hairline read-progress line — understated, printed-page feel. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 z-[80] h-px w-full bg-transparent">
      <div
        className="h-full bg-ink/70 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/** Fine film grain over the whole page — subtle, adds print texture. */
export function Grain() {
  const reduced = useReducedMotion();
  return <div aria-hidden className={reduced ? "grain-layer" : "grain-layer"} />;
}

/** A trailing cursor marker (native cursor stays visible). Desktop + fine pointers only. */
function CursorMark() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const disabled = useReducedMotion();
  const isTouch = useIsMobile("(pointer: coarse)");

  useEffect(() => {
    if (disabled || isTouch) return;
    let raf = 0;
    const onMove = (event: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPos({ x: event.clientX, y: event.clientY });
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [disabled, isTouch]);

  if (disabled || isTouch) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[75] h-6 w-6 mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease, left 90ms linear, top 90ms linear",
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="absolute inset-0 rounded-full border border-white/70" />
    </div>
  );
}

/** Page atmosphere: warm paper washes + grain + cursor mark. */
export function Backdrop() {
  return (
    <>
      <Grain />
      <CursorMark />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-bone" />
        <div className="absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(90,97,70,0.10),transparent_65%)] blur-[60px]" />
        <div className="absolute top-1/3 -right-52 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(154,123,79,0.10),transparent_65%)] blur-[70px]" />
        <div className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.05),transparent_65%)] blur-[80px]" />
      </div>
    </>
  );
}
