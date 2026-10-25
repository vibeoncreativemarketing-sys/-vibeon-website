const SERVICES = [
  { title: "SMM Strategy", body: "Brand, audience, goals and content direction" },
  { title: "Content Plan", body: "Monthly post and topic planning" },
  { title: "Post Design", body: "Professional social media design" },
  { title: "Reels Production", body: "Reels concept, script, editing and production" },
  { title: "AI Reels", body: "Creative / cinematic Reels using AI technology" },
  { title: "AI Photo + Design", body: "AI photos, compositions and branded visuals" },
  { title: "Stories", body: "Story design and content" },
  { title: "Copywriting", body: "Social media and advertising copy" },
  { title: "Targeting", body: "Meta Ads setup, audience selection and management" },
  { title: "Page Management", body: "Post publishing and page management" },
  { title: "SMM Audit", body: "Page and competitor analysis" },
  { title: "Monthly Report", body: "Analysis of key metrics and results" },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Vibeon
            </p>
            <div className="red-rule mt-2" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
            Individual Services
          </p>
        </div>
        <h2 className="mt-10 text-[clamp(2.2rem,6vw,4.4rem)] font-semibold uppercase leading-[0.92] tracking-tight text-white">
          Individual Services
        </h2>
        <p className="mt-5 max-w-2xl text-base text-white/60">
          Choose individual services and build a package according to your business
          goals.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="border-l-2 border-vibeon bg-panel px-6 py-5"
            >
              <h3 className="text-base font-semibold text-white">{service.title}</h3>
              <p className="mt-1.5 text-sm text-white/50">{service.body}</p>
            </article>
          ))}
        </div>

        <a
          href="/#contact"
          className="mt-10 flex flex-col items-start justify-between gap-3 bg-vibeon px-6 py-5 text-white transition hover:bg-vibeon-dark sm:flex-row sm:items-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            Custom Package
          </span>
          <span className="text-sm text-white/90">
            Combine services according to your business goals, budget and required
            content volume.
          </span>
        </a>
      </div>
    </section>
  );
}
