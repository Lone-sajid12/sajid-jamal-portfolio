# Sajid Jamal — Portfolio

**SAJID JAMAL — DATA → INTELLIGENCE**
Turning data into better decisions.

An editorial, image-led portfolio for a Computer science student working from Data Analytics → Data Science → AI/ML → Automation.
Built with React 19, Vite, Tailwind CSS v4, Framer Motion and Lenis smooth scrolling.

---

## Quick start

```bash
npm install
npm run dev     # dev server
npm run build   # single-file production build → dist/index.html
```

## Routes

The site builds to one static `index.html`, so routing is hash-based and every deep link works on any host
(including opening the file directly).

| Page | Route |
| --- | --- |
| Home | `#/` |
| About | `#/about` |
| Projects archive | `#/projects` |
| Project case study | `#/projects/<slug>` |
| Certifications | `#/certifications` |
| Journey | `#/journey` |
| Contact | `#/contact` |

## Files you may want to drop in

| What | Where | Notes |
| --- | --- | --- |
| Your portrait | `public/mypic.png` | Replace the bundled placeholder photo. If the file is missing, a monogram panel renders instead of a broken image — the arch crop, slow zoom, cursor depth and reveal all still work. |
| Static resume (optional) | `public/resume.pdf` | **Download Resume** already generates a real PDF in the browser with jsPDF (desktop + mobile, no network). Adding this file gives you a static copy to share directly. |
| Resume content | `src/lib/resume.ts` | The generator reads `src/lib/data.ts`, so the PDF and the site never disagree. |

## Connect the contact form

`src/components/ContactSection.tsx` starts with `const FORM_ENDPOINT = "";`. Paste any POST endpoint
(Formspree, Resend, a serverless function, an n8n webhook) and the form submits to it. While it is empty the form
never pretends to send: it validates (name / email format / message length + honeypot) and offers a pre-filled
email instead.

## Visual direction

- **Palette:** warm bone `#F4F1EA`, soft black `#111111`, charcoal `#242424`, warm gray `#8A877F`, with one
  restrained accent family — deep olive `#5A6146` and muted bronze `#9A7B4F`. Predominantly light, with a single
  dark block for the resume + contact finale.
- **Typography:** Fraunces (variable serif, including the italic "wonk" axis for accent words) as the display face,
  Inter Tight for long-form text, JetBrains Mono for metadata labels set in wide-tracked uppercase.
- **Motifs:** hairline rules instead of cards, full-bleed images, oversized display type, film grain, numbered
  section labels, row-hover inversions, magnetic buttons, scroll-driven word reveals, clip-path image reveals and
  slow parallax. No glow, no glassmorphism, no neon.
- **3D is felt, not shown:** cursor-driven depth on the portrait, scroll parallax on image planes, layered
  typography and perspective transforms — instead of rotating WebGL objects.
- **Motion:** Lenis smooth scroll, Framer Motion page transitions (clip + fade), typographic curtain intro,
  line-by-line type reveals, scroll-drawn journey and pipeline sequences.

## Content integrity rules followed by this site

- No invented work experience, clients, job titles, business impact, user counts, ML accuracy or awards.
- No fabricated certificate IDs, grades, dates or verification links — missing data is labelled as pending.
- Skills are plain text labelled `confident` / `building` / `exploring`; nothing is scored by a fake percentage bar.
- GitHub data is fetched live from `api.github.com`; if unavailable, a plain profile link is shown instead of
  invented statistics.
- Projects are labelled learning builds with stated limitations in each case study
  (Problem · Data · Process · Technology · Result · What I learned).

## Performance & accessibility

- `prefers-reduced-motion` disables Lenis, grain animation, marquee and all reveals.
- Touch devices skip cursor effects; images are lazy-loaded with `decoding="async"`.
- Animations are limited to transform / opacity / clip-path for GPU-friendly rendering.

---

© 2026 Sajid Jamal. Built with curiosity and code.
