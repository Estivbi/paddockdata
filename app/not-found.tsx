import Link from "next/link";
import { FlagOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-24 text-center">
      <FlagOff className="h-10 w-10 text-red" />
      <h1 className="font-heading text-2xl font-black uppercase tracking-wide text-text">
        Bandera a cuadros… pero aquí no hay nada
      </h1>
      <p className="text-sm text-text-muted">
        No encontramos ese Gran Premio. Puede que aún no esté en el calendario
        o que la dirección esté mal escrita.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-red px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-red-dim"
      >
        Volver al calendario
      </Link>
    </div>
  );
}
