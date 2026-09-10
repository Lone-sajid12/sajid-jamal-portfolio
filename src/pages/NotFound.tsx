import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[74vh] max-w-[1600px] flex-col justify-center px-5 pt-32 md:px-10">
      <SectionLabel index="404" title="Not Found" />
      <Reveal>
        <h1 className="mt-12 font-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.88] tracking-[-0.05em]">
          This route isn't in
          <br />
          <span className="accent-italic text-olive">the pipeline.</span>
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-md text-[15px] leading-[1.85] text-ink/70">
          The page you asked for doesn't exist — maybe a slug changed. The work is still one click away.
        </p>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Link to="/" className="label link-sweep pb-1 text-ink">
            Back home →
          </Link>
          <Link to="/projects" className="label link-sweep pb-1 text-ink">
            Browse projects →
          </Link>
          <Link to="/contact" className="label link-sweep pb-1 text-ink">
            Say hello →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
