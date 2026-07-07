import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-border bg-bg/92 px-5 backdrop-blur-md">
      <Link href="/" className="flex items-baseline gap-2.5">
        <span className="font-heading text-xl font-black uppercase tracking-wide text-text">
          Paddock<span className="text-red">Data</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-text-muted sm:flex">
        <Link href="/" className="transition hover:text-text">
          Calendario 2026
        </Link>
      </nav>
    </header>
  );
}
