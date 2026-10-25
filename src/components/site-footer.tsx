import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-vibeon bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-3xl tracking-tight text-white">
            <span className="text-vibeon">/</span>vibeon
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            A premium social media marketing agency. Strategy, cinematic content and
            measurable growth for brands that refuse to look generic.
          </p>
        </div>
        <div className="text-sm text-white/60">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white">Studio</p>
          <div className="mt-4 space-y-2">
            <p>Social Media · Branding · Content · Digital Marketing</p>
            <p>
              Instagram{" "}
              <a
                href="https://www.instagram.com/vibeon_creative"
                className="text-vibeon"
                target="_blank"
                rel="noreferrer"
              >
                @vibeon_creative
              </a>
            </p>
            <p>
              Phone{" "}
              <a href="tel:+37494918198" className="hover:text-white">
                +374 94 918 198
              </a>
            </p>
          </div>
        </div>
        <div className="text-sm text-white/60">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white">Navigate</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/#packages" className="hover:text-white">
              Packages
            </Link>
            <Link href="/cart" className="hover:text-white">
              Cart
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[11px] uppercase tracking-[0.16em] text-white/35 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} VIBEON CREATIVE</p>
          <p>vibeoncreativemarketing.am</p>
        </div>
      </div>
    </footer>
  );
}
