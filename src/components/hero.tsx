import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="noise pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 lg:justify-center lg:px-8 lg:pb-24 lg:pt-28">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-[11px] uppercase tracking-[0.38em] text-white/70">
            Strategy <span className="mx-2 text-vibeon">/</span> Content{" "}
            <span className="mx-2 text-vibeon">/</span> Results
          </p>
          <h1 className="animate-fade-up delay-1 mt-6 font-display text-[clamp(3.4rem,9vw,7.2rem)] leading-[0.88] tracking-tight text-white">
            We turn
            <br />
            ideas into
            <br />
            <span className="text-vibeon">brands.</span>
          </h1>
          <p className="animate-fade-up delay-2 mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            VIBEON CREATIVE is a social media marketing agency building cinematic
            content systems, SMM strategy and recognizable visual language for
            ambitious brands.
          </p>
          <div className="animate-fade-up delay-3 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/#packages"
              className="inline-flex items-center bg-vibeon px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-vibeon-dark"
            >
              View packages
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center border border-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="mt-1 h-10 w-px bg-vibeon" />
            <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.22em] text-white/65">
              Your brand.
              <br />
              Your story.
              <br />
              Our strategy.
            </p>
          </div>
          <Link
            href="/#packages"
            className="hidden items-center justify-center text-vibeon sm:flex"
            aria-label="Scroll to packages"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
