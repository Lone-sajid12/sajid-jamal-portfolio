import { useEffect, useMemo, useRef, useState } from "react";

/** Respects the user's motion preference (accessibility + performance). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Simple breakpoint hook — heavy 3D / mouse effects are disabled on small screens. */
export function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return isMobile;
}

export function useLowPower() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  return reduced || isMobile;
}

/** Normalised pointer position (-1 → 1) with a passed-in smoothing factor. */
export function usePointerParallax<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const disabled = useLowPower();
  const frame = useRef(0);

  useEffect(() => {
    if (disabled) {
      setPointer({ x: 0, y: 0 });
      return;
    }
    const onMove = (event: PointerEvent) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setPointer({
          x: ((event.clientX / window.innerWidth) * 2 - 1) * strength,
          y: ((event.clientY / window.innerHeight) * 2 - 1) * strength,
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [disabled, strength]);

  return { ref, pointer, disabled };
}

/** CSS-only 3D tilt for cards. Disabled on touch devices. */
export function useTilt(max = 10) {
  const ref = useRef<HTMLDivElement | null>(null);
  const disabled = useLowPower();

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(14px)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return { ref, onMove, onLeave };
}

/** Animated counter — only used for real, verifiable numbers. */
export function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, reduced]);

  return value;
}

/** Scroll progress of the whole document (0 → 1). */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Section-level "is this on screen" hook for lightweight scroll reveals. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const opts = useMemo(() => options ?? { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }, [options]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, opts);
    observer.observe(el);
    return () => observer.disconnect();
  }, [opts]);

  return { ref, inView };
}

/** Deterministic particle field used by the portrait + backdrop visuals. */
export function useParticles(count: number, seed = 7) {
  return useMemo(() => {
    let s = seed;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2.6,
      delay: rand() * 6,
      duration: 6 + rand() * 8,
      opacity: 0.25 + rand() * 0.5,
    }));
  }, [count, seed]);
}
