import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { profile } from "@/lib/data";
import { downloadResume } from "@/lib/resume";
import { cn } from "@/utils/cn";
import { Reveal, SectionLabel } from "./ui";

/**
 * Set FORM_ENDPOINT to your POST endpoint (Formspree, Resend, n8n…) and the
 * form submits to it. While it is empty the form never pretends to send — it
 * offers a pre-filled email so nothing is silently dropped.
 */
const FORM_ENDPOINT = "";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: `github.com/${profile.githubHandle}`, href: profile.github },
  { label: "LinkedIn", value: "in/sajid-jamal-130462380", href: profile.linkedin },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "endpoint-missing" | "error">("idle");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [form]);

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 12) next.message = "A little more detail helps (12+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.honey) return; // honeypot: silent rejection
    if (!validate()) return;

    if (!FORM_ENDPOINT) {
      setStatus("endpoint-missing");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "", honey: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (invalid?: string) =>
    cn(
      "w-full border-b bg-transparent pt-3 pb-3 text-[15px] text-bone placeholder-bone/30 outline-none transition-colors duration-500 focus:border-bone",
      invalid ? "border-bronze" : "border-bone/22"
    );

  return (
    <section id="contact" className="relative z-10 bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <SectionLabel index="09" title="Contact" dark />

        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.92] tracking-[-0.045em]">
              Let's build
              <br />
              something
              <br />
              <span className="accent-italic text-bone/75">intelligent.</span>
            </h2>

            <div className="mt-14 space-y-0">
              {channels.map((channel, index) => (
                <Reveal key={channel.label} delay={index * 0.05}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="group rule-dark flex items-baseline justify-between gap-6 border-t py-5 transition-colors duration-500"
                  >
                    <span className="label text-bone/45">{channel.label}</span>
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-[clamp(1.15rem,2.6vw,1.7rem)] leading-none tracking-[-0.03em] text-bone/90 transition-colors group-hover:text-bone">
                        {channel.value}
                      </span>
                      <span className="label text-bone/40 transition-transform duration-500 group-hover:translate-x-1.5">
                        ↗
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={0.18}>
                <button
                  type="button"
                  onClick={() => downloadResume()}
                  className="group rule-dark flex w-full items-baseline justify-between gap-6 border-t border-b py-5"
                >
                  <span className="label text-bone/45">Resume</span>
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-[clamp(1.15rem,2.6vw,1.7rem)] leading-none tracking-[-0.03em] text-bone/90 transition-colors group-hover:text-bone">
                      Download PDF
                    </span>
                    <span className="label text-bone/40 transition-transform duration-500 group-hover:translate-y-1">↓</span>
                  </span>
                </button>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[14px] leading-[1.8] text-bone/55">
                {profile.location}. Open to internships, trainee roles, student hackathons and open-source
                collaboration — and to honest feedback on any project here.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={submit} noValidate className="space-y-8">
              <div>
                <label className="label text-bone/45" htmlFor="cf-name">
                  Your name
                </label>
                <input
                  id="cf-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                  autoComplete="name"
                  className={inputClass(errors.name)}
                />
                {errors.name && <p className="mt-2 text-[12px] text-bronze">{errors.name}</p>}
              </div>

              <div>
                <label className="label text-bone/45" htmlFor="cf-email">
                  Your email
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="mt-2 text-[12px] text-bronze">{errors.email}</p>}
              </div>

              <div>
                <label className="label text-bone/45" htmlFor="cf-message">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What would you like to build, discuss or ask?"
                  className={cn(inputClass(errors.message), "resize-none")}
                />
                {errors.message && <p className="mt-2 text-[12px] text-bronze">{errors.message}</p>}
              </div>

              <input
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                value={form.honey}
                onChange={(e) => setForm((f) => ({ ...f, honey: e.target.value }))}
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 font-mono text-[10.5px] tracking-[0.22em] text-ink uppercase transition-colors duration-500 hover:bg-white disabled:opacity-60"
                >
                  {status === "sending" ? "Validating…" : "Send message"}
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </button>
                <a href={mailtoHref} className="link-sweep label pb-1 text-bone/55 transition-colors hover:text-bone">
                  or email directly
                </a>
              </div>

              {(status === "endpoint-missing" || status === "error") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-bronze/60 pt-5"
                >
                  <p className="text-[13.5px] leading-[1.8] text-bone/70">
                    {status === "error"
                      ? "The endpoint didn't accept the message just now — nothing was silently dropped."
                      : "This form isn't wired to a backend yet, so nothing was sent automatically. Use the direct email link and it will reach me."}{" "}
                    To enable submissions, set
                    <span className="font-mono text-bone"> FORM_ENDPOINT </span>
                    in
                    <span className="font-mono text-bone"> src/components/ContactSection.tsx</span>.
                  </p>
                  <a
                    href={mailtoHref}
                    className="link-sweep label mt-4 inline-block pb-1 text-bone transition-colors"
                  >
                    Compose email →
                  </a>
                </motion.div>
              )}

              {status === "sent" && (
                <p className="border-t border-bone/25 pt-5 text-[13.5px] text-bone/80">
                  Message delivered. Thank you — I'll reply as soon as my coursework allows.
                </p>
              )}

              <p className="label text-bone/35">
                {FORM_ENDPOINT
                  ? "POSTs to your endpoint · nothing stored on this site"
                  : "Basic validation + honeypot spam trap enabled"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
