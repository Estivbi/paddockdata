import Link from "next/link";
import { Flag } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Flag className="h-6 w-6 text-red" strokeWidth={2.5} />
          <span className="font-heading text-2xl font-semibold uppercase tracking-wide text-text">
            Paddock<span className="text-red">Data</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-text-muted sm:flex">
          <Link href="/" className="transition hover:text-text">
            Calendario 2026
          </Link>
        </nav>
      </div>
    </header>
  );
}
