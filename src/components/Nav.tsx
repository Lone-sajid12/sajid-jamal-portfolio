import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "@/lib/data";
import { downloadResume, viewResume } from "@/lib/resume";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/utils/cn";

const links = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Certifications", to: "/certifications" },
  { label: "Journey", to: "/journey" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeLabel = (() => {
    if (location.pathname === "/") return null;
    const best = links
      .map((l) => l.to)
      .filter((p) => location.pathname.startsWith(p))
      .sort((a, b) => b.length - a.length)[0];
    return links.find((l) => l.to === best)?.label ?? null;
  })();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[70]">
        <div
          className={cn(
            "transition-all duration-700",
            scrolled ? "border-b border-ink/10 bg-bone/85 backdrop-blur-md" : "border-b border-transparent"
          )}
        >
          <nav
            className={cn(
              "mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-700 md:px-10",
              scrolled ? "h-16 md:h-[4.5rem]" : "h-20 md:h-24"
            )}
          >
            <Link to="/" aria-label="Sajid Jamal — home" className="group flex items-baseline gap-3">
              <span className="font-display text-[19px] leading-none font-semibold tracking-[-0.04em] text-ink">
                SJ
              </span>
              <span className="hidden flex-col gap-1 sm:flex">
                <span className="label text-ink">Sajid Jamal</span>
                <span className="label text-[9.5px] text-warmgray transition-colors group-hover:text-olive">
                  Data → Intelligence
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={cn(
                      "label link-sweep pb-1 transition-colors duration-300",
                      activeLabel === link.label ? "text-ink" : "text-ink/55 hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => viewResume()}
                className="label hidden text-ink/55 transition-colors hover:text-ink xl:block"
              >
                View Resume
              </button>
              <button
                type="button"
                onClick={() => downloadResume()}
                className="group hidden items-center gap-2.5 rounded-full bg-ink px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-bone uppercase transition-colors duration-500 hover:bg-charcoal sm:inline-flex"
              >
                Download Resume
                <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </button>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              >
                <span
                  className={cn(
                    "block h-[1.5px] w-6 bg-ink transition-all duration-500",
                    open && "translate-y-[3.75px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-[1.5px] w-6 bg-ink transition-all duration-500",
                    open && "-translate-y-[3.75px] -rotate-45"
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[65] bg-bone lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
              <ul className="space-y-1">
                {links.map((link, index) => (
                  <li key={link.label} className="overflow-hidden border-b border-ink/10">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.7, delay: 0.12 + index * 0.05, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Link
                        to={link.to}
                        className="flex items-baseline justify-between py-4 font-display text-[2.2rem] leading-none text-ink"
                      >
                        {link.label}
                        <span className="label text-warmgray">0{index + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => downloadResume()}
                  className="label w-full rounded-full bg-ink py-4 text-bone"
                >
                  Download Resume ↓
                </button>
                <div className="flex items-center justify-between">
                  <a href={`mailto:${profile.email}`} className="label text-ink/60">
                    {profile.email}
                  </a>
                  <span className="label text-warmgray">Srinagar, J&amp;K</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
