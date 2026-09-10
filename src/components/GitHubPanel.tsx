import { useEffect, useState } from "react";
import { profile, projects } from "@/lib/data";
import { Reveal, SectionLabel } from "./ui";

type PublicRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

type Status =
  | { state: "loading" }
  | { state: "unavailable" }
  | { state: "ready"; repos: PublicRepo[]; publicRepos: number };

/**
 * Real GitHub data or a plain link — never fabricated statistics.
 * Falls back to a quiet link row when the public API is unreachable.
 */
export function GitHubPanel() {
  const [status, setStatus] = useState<Status>({ state: "loading" });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubHandle}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${profile.githubHandle}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !repoRes.ok) throw new Error("unavailable");
        const user = (await userRes.json()) as { public_repos?: number };
        const repos = (await repoRes.json()) as PublicRepo[];
        if (cancelled) return;
        setStatus({
          state: "ready",
          repos: Array.isArray(repos) ? repos.slice(0, 5) : [],
          publicRepos: user.public_repos ?? (Array.isArray(repos) ? repos.length : 0),
        });
      } catch {
        if (!cancelled) setStatus({ state: "unavailable" });
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const focusAreas = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <SectionLabel index="08" title="Building in Public" />

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.98] tracking-[-0.04em]">
              Everything I build
              <br />
              <span className="accent-italic text-olive">ends up on GitHub.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-ink/70">
              Notebooks, small tools and scripts stay public so the process is visible — including the notes about
              what is finished and what is still half-built.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-10 space-y-5 border-t rule pt-8">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="label text-warmgray">Profile</dt>
                <dd className="font-mono text-[12.5px] text-ink">@{profile.githubHandle}</dd>
              </div>
              {status.state === "ready" && (
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="label text-warmgray">Public repositories</dt>
                  <dd className="font-mono text-[12.5px] text-ink">{status.publicRepos}</dd>
                </div>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <dt className="label text-warmgray">Focus areas</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-ink/70">
                  {focusAreas.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-sweep mt-8 inline-block pb-1 font-mono text-[11px] tracking-[0.22em] text-ink uppercase"
            >
              github.com/{profile.githubHandle} →
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {status.state === "loading" && (
            <ul className="space-y-0">
              {[0, 1, 2].map((i) => (
                <li key={i} className="rule-t flex h-24 animate-pulse items-center">
                  <span className="label text-warmgray">Reading public repositories…</span>
                </li>
              ))}
            </ul>
          )}

          {status.state === "unavailable" && (
            <div className="rule-t py-8">
              <p className="max-w-xl text-[14.5px] leading-[1.85] text-ink/70">
                Public GitHub data isn't reachable from this browser right now — the API may be rate-limited or
                blocked. Nothing here is invented to fill the gap: open the profile to see the real repositories,
                commit history and language breakdown directly on GitHub.
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-sweep mt-6 inline-block pb-1 font-mono text-[11px] tracking-[0.22em] text-ink uppercase"
              >
                Open profile →
              </a>
            </div>
          )}

          {status.state === "ready" && (
            <ul>
              {status.repos.map((repo, index) => (
                <Reveal key={repo.id} delay={index * 0.05}>
                  <li className="rule-t">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group grid gap-3 py-7 transition-colors duration-700 hover:bg-ink md:grid-cols-12 md:items-baseline md:gap-4 md:px-4"
                    >
                      <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/45 md:col-span-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[clamp(1.25rem,2.4vw,1.7rem)] leading-none tracking-[-0.03em] transition-colors duration-700 group-hover:text-bone md:col-span-4">
                        {repo.name}
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-ink/65 transition-colors duration-700 group-hover:text-bone/70 md:col-span-6">
                        {repo.description ?? "No description added yet."}
                      </span>
                      <span className="label text-warmgray transition-colors duration-700 group-hover:text-bone/45 md:col-span-1 md:text-right">
                        {repo.language ?? "—"}
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
              {status.repos.length === 0 && (
                <li className="rule-t py-8">
                  <p className="text-[14.5px] text-ink/70">
                    The profile is public but has no public repositories yet — new builds are on the way.
                  </p>
                </li>
              )}
            </ul>
          )}

          <p className="label mt-6 text-warmgray">
            Live from api.github.com — repository data only, no invented contribution numbers.
          </p>
        </div>
      </div>
    </section>
  );
}
