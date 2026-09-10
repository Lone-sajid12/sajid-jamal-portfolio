import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const EASE = [0.19, 1, 0.22, 1] as const;

/* ─────────────────────────────── reveals ─────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line typographic reveal: type sets, then settles. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line + index} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.05, delay: delay + index * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ────────────────────── scroll-driven word reveal ────────────────────── */

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      <span>&nbsp;</span>
    </motion.span>
  );
}

/** A paragraph whose words come into focus as you scroll — the classic editorial move. */
export function ScrollWords({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        const clean = word.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
        const isHighlighted = highlight.some((h) => h.toLowerCase() === clean);
        const node = (
          <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
        return isHighlighted ? (
          <span key={`w-${index}`} className="accent-italic text-olive">
            {node}
          </span>
        ) : (
          node
        );
      })}
    </p>
  );
}

/* ───────────────────────────── image treatment ───────────────────────── */

export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.25, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "aspect-[4/3]",
  scale = 1.14,
  shift = 26,
  position = "object-center",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  scale?: number;
  shift?: number;
  position?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1.02, scale]);
  const yValue = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <div ref={ref} className={cn("media-hover relative overflow-hidden bg-sand", className)}>
      <MaskReveal>
        <div className={cn("relative w-full", ratio)}>
          <motion.img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            style={{ scale: scaleValue, y: yValue }}
            className={cn("media h-full w-full object-cover", position, imgClassName)}
          />
        </div>
      </MaskReveal>
    </div>
  );
}

/* ────────────────────────────── interaction ──────────────────────────── */

export function Magnetic({
  children,
  strength = 7,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-block transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]", className)}
    >
      {children}
    </span>
  );
}

type ButtonVariant = "solid" | "outline" | "light" | "ghostDark" | "link" | "linkDark";

const buttonStyles: Record<ButtonVariant, string> = {
  solid: "rounded-full bg-ink px-7 py-4 text-bone hover:bg-charcoal",
  outline: "rounded-full border border-ink/25 px-7 py-4 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  light: "rounded-full bg-bone px-7 py-4 text-ink hover:bg-white",
  ghostDark: "rounded-full border border-bone/25 px-7 py-4 text-bone hover:bg-bone hover:text-ink",
  link: "text-ink/60 hover:text-ink",
  linkDark: "text-bone/60 hover:text-bone",
};

export function ArrowButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  ariaLabel,
  download,
  showArrow = true,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
  download?: boolean;
  showArrow?: boolean;
}) {
  const base = cn(
    "group inline-flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.22em] uppercase transition-all duration-500",
    buttonStyles[variant],
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto");
    return (
      <Magnetic strength={5}>
        <a
          href={href}
          aria-label={ariaLabel}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className={base}
        >
          {inner}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={5}>
      <button type="button" aria-label={ariaLabel} onClick={onClick} className={base}>
        {inner}
      </button>
    </Magnetic>
  );
}

/* ─────────────────────────────── structure ───────────────────────────── */

export function SectionLabel({
  index,
  title,
  dark = false,
  className,
}: {
  index: string;
  title: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal amount={0.4} className={className}>
      <div className="flex items-center gap-5">
        <span className={cn("label", dark ? "text-bone/45" : "text-warmgray")}>{index}</span>
        <span className={cn("h-px flex-1", dark ? "bg-bone/18" : "bg-ink/12")} />
        <span className={cn("label", dark ? "text-bone/80" : "text-ink/75")}>{title}</span>
      </div>
    </Reveal>
  );
}

export function Marquee({
  items,
  className,
  duration = 46,
  separator = "—",
}: {
  items: string[];
  className?: string;
  duration?: number;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-warmgray/70">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-[marquee_linear_infinite]"
        style={{ animationDuration: `${duration}s` }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
