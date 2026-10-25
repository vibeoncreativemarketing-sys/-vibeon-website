const INDUSTRIES = [
  {
    name: "Furniture",
    images: ["/images/furniture.jpg", "/images/bedroom.jpg", "/images/interior-2.jpg", "/images/interior-3.jpg"],
  },
  {
    name: "Gym",
    images: ["/images/gym.jpg", "/images/gym-2.jpg", "/images/gym-3.jpg", "/images/studio.jpg"],
  },
  {
    name: "Fast Food",
    images: ["/images/food.jpg", "/images/food-2.jpg", "/images/food-3.jpg", "/images/event.jpg"],
  },
];

export function SmmAiSection() {
  return (
    <section id="smm-ai" className="border-t border-white/5 bg-ink-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Vibeon
            </p>
            <div className="red-rule mt-2" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">SMM AI</p>
        </div>

        <h2 className="mt-10 text-[clamp(2.6rem,7vw,5rem)] font-semibold uppercase leading-[0.9] tracking-tight text-white">
          SMM AI
        </h2>
        <p className="mt-5 max-w-2xl text-base text-white/60">
          Advanced AI-powered content production for creative and cinematic social
          media.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="package-card relative p-7">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-vibeon" />
            <h3 className="text-xl font-semibold uppercase tracking-[0.08em] text-white">
              SMM AI
            </h3>
            <p className="mt-3 text-sm font-medium text-vibeon">From 300,000 AMD / month</p>
            <ul className="mt-6 space-y-2 text-sm text-white/75">
              {[
                "16+ posts",
                "5 AI Reels",
                "AI photo + design",
                "30+ Stories",
                "AI Product Content",
                "AI character creation",
                "Creative / Cinematic AI content",
                "Script development",
                "Storytelling content",
                "Content strategy",
                "Copywriting",
                "Full page management",
                "Targeting and advertising campaign management",
                "Monthly content plan",
                "Results analysis",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="mt-8 inline-flex w-full items-center justify-center bg-vibeon px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-vibeon-dark"
            >
              Request a proposal
            </a>
          </aside>

          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-tight text-white md:text-3xl">
              What AI approach do we offer you?
            </h3>
            <p className="mt-3 text-sm text-white/55">
              Different industries. Different visual worlds. One AI-driven content
              system.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {INDUSTRIES.map((industry) => (
                <div key={industry.name}>
                  <div className="grid grid-cols-2 gap-1.5">
                    {industry.images.map((src) => (
                      <div key={src} className="aspect-square overflow-hidden bg-panel">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`${industry.name} content example`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-vibeon">
                    {industry.name}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/50">
              AI photography · cinematic Reels · branded characters · product scenes ·
              storytelling · visual concepts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
