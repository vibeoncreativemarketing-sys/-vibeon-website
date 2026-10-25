const STEPS = [
  {
    n: "01",
    title: "Concept",
    body: "Define the creative direction, audience and campaign idea.",
  },
  {
    n: "02",
    title: "Visual World",
    body: "Build the color, lighting, composition and art direction.",
  },
  {
    n: "03",
    title: "AI Production",
    body: "Create product visuals, characters, scenes and cinematic assets.",
  },
  {
    n: "04",
    title: "Storytelling",
    body: "Turn visuals into posts, Reels, Stories and campaign narratives.",
  },
  {
    n: "05",
    title: "Distribution",
    body: "Publish, manage targeting and analyze content performance.",
  },
];

export function SystemSection() {
  return (
    <section className="border-t border-white/5 bg-ink-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Vibeon
            </p>
            <div className="red-rule mt-2" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
            AI Content System
          </p>
        </div>
        <h2 className="mt-10 text-[clamp(2.2rem,6vw,4.4rem)] font-semibold uppercase leading-[0.92] tracking-tight text-white">
          AI Content System
        </h2>
        <p className="mt-5 max-w-2xl text-base text-white/60">
          From one idea to a complete, recognizable visual language.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_420px]">
          <ol className="space-y-7">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vibeon text-xs font-semibold text-white">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="bg-panel p-8 lg:p-10">
            <p className="text-2xl font-semibold uppercase tracking-tight text-vibeon">
              AI × Brand
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Not generic AI content.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Every visual is built around the brand: its colors, products, tone,
              audience and story. The result is a consistent feed that can move from
              product photography to cinematic storytelling without losing identity.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
