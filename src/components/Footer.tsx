import { Link } from "react-router-dom";
import { profile } from "@/lib/data";
import { downloadResume, viewResume } from "@/lib/resume";

const columns = [
  {
    title: "Navigate",
    items: [
      { label: "About", to: "/about" },
      { label: "Projects", to: "/projects" },
      { label: "Certifications", to: "/certifications" },
      { label: "Journey", to: "/journey" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-5 pt-16 pb-10 md:px-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label text-bone/45">Sajid Jamal</p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
              Learn. Build.
              <br />
              <span className="accent-italic text-bone/75">Grow.</span>
            </h2>
            <p className="mt-8 max-w-md text-[14.5px] leading-relaxed text-bone/60">
              Turning data into decisions, models and intelligent workflows.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="label text-bone/45">Data</p>
              <ul className="mt-5 space-y-3 text-[14px] text-bone/70">
                <li>Analytics</li>
                <li>Science</li>
                <li>AI / ML</li>
                <li>Automation</li>
              </ul>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <p className="label text-bone/45">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="link-sweep pb-0.5 text-[14px] text-bone/70 transition-colors hover:text-bone"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="label text-bone/45">Connect</p>
              <ul className="mt-5 space-y-3">
                {[
                  { label: "GitHub", href: profile.github },
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "Email", href: `mailto:${profile.email}` },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="link-sweep pb-0.5 text-[14px] text-bone/70 transition-colors hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => downloadResume()}
                    className="link-sweep pb-0.5 text-[14px] text-bone/70 transition-colors hover:text-bone"
                  >
                    Resume ↓
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => viewResume()}
                    className="link-sweep pb-0.5 text-[14px] text-bone/70 transition-colors hover:text-bone"
                  >
                    View Resume ↗
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-bone/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-bone/45">© 2026 Sajid Jamal. Built with curiosity and code.</p>
          <p className="label text-bone/45">
            {profile.location} — <span className="text-bone/70">Turning data into better decisions.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
