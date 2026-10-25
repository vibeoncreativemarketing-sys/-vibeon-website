import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-vibeon">404</p>
        <h1 className="mt-4 font-display text-6xl text-white">Page not found</h1>
        <Link
          href="/"
          className="mt-8 inline-flex bg-vibeon px-6 py-3 text-xs uppercase tracking-[0.18em] text-white"
        >
          Back to studio
        </Link>
      </div>
    </main>
  );
}
