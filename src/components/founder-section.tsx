export function FounderSection() {
  return (
    <section id="about" className="relative min-h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-[center_top]"
        style={{ backgroundImage: "url('/images/founder.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-5 py-16 lg:justify-center lg:px-8 lg:py-24">
        <div className="mb-auto flex items-start justify-between pt-20">
          <span className="font-display text-3xl tracking-tight text-white">
            <span className="text-vibeon">/</span>vibeon
          </span>
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right text-[10px] uppercase tracking-[0.22em] text-white/70">
              <p>Social Media</p>
              <p>Marketing Agency</p>
            </div>
            <span className="h-px w-8 bg-vibeon" />
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Leadership</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6.2rem)] leading-[0.88] text-white">
            Founder & CEO
          </h2>
          <div className="mt-4 h-[3px] w-16 bg-vibeon" />
          <p className="mt-5 font-display text-[clamp(2rem,5vw,3.8rem)] text-white/90">
            Ani Kamalyan
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-10 w-px bg-vibeon" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
              Vibeon
              <br />
              Creative
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
