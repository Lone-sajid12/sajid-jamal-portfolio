import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Backdrop, ScrollProgress } from "@/components/Backdrop";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import About from "@/pages/About";
import Certifications from "@/pages/Certifications";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Journey from "@/pages/Journey";
import { useReducedMotion } from "@/lib/hooks";
import NotFound from "@/pages/NotFound";
import ProjectCaseStudy from "@/pages/ProjectCaseStudy";
import Projects from "@/pages/Projects";

/**
 * Routing uses hash routes (/ → #/ , projects → #/projects) because the site
 * builds to a single static file — this keeps every deep link
 * (including #/projects/retail-sales-intelligence) working anywhere it is hosted.
 */

/** Smooth, editorial scrolling (Lenis) — disabled for reduced-motion users. */
function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);
}

function ScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    const target = location.hash.replace("#", "");
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        window.requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, clipPath: "inset(0 0 6% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(4% 0 0 0)" }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFrame><Home /></PageFrame>} />
        <Route path="/about" element={<PageFrame><About /></PageFrame>} />
        <Route path="/projects" element={<PageFrame><Projects /></PageFrame>} />
        <Route path="/projects/:slug" element={<PageFrame><ProjectCaseStudy /></PageFrame>} />
        <Route path="/certifications" element={<PageFrame><Certifications /></PageFrame>} />
        <Route path="/journey" element={<PageFrame><Journey /></PageFrame>} />
        <Route path="/contact" element={<PageFrame><Contact /></PageFrame>} />
        <Route
          path="*"
          element={
            <PageFrame>
              <NotFound />
            </PageFrame>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/** Brief typographic curtain on first load — name, then the page. */
function Intro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduced ? 120 : 1000);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[120] bg-bone"
        >
          <div className="flex h-full flex-col justify-between px-5 py-8 md:px-10 md:py-10">
            <div className="flex items-center justify-between">
              <span className="label text-warmgray">Portfolio — 2026</span>
              <span className="label text-warmgray">Srinagar, J&amp;K</span>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                className="font-display text-[clamp(2.4rem,10vw,8rem)] leading-[0.9] tracking-[-0.05em]"
              >
                Sajid Jamal
              </motion.p>
            </div>

            <div className="flex items-end justify-between gap-6">
              <span className="label text-ink">Data → Intelligence</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="h-px flex-1 origin-left bg-ink/25"
              />
              <span className="label text-warmgray">Turning data into better decisions</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <HashRouter>
      <ScrollProgress />
      <Intro />
      <Backdrop />
      <ScrollManager />
      <Nav />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  );
}
