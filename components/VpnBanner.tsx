import { ShieldCheck } from "lucide-react";
import type { Affiliate } from "@/lib/types";

export function VpnBanner({ affiliates }: { affiliates: Affiliate[] }) {
  if (affiliates.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
      <div className="rounded-xl border border-red/40 bg-red/10 p-6 sm:p-8">
        <h2 className="font-heading flex items-center gap-2 text-2xl font-semibold">
          <ShieldCheck className="h-6 w-6 text-red" />
          ¿Sin cobertura de F1 en tu país?
        </h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Si tu retransmisora habitual o F1 TV no está disponible donde estás,
          una VPN te permite seguir Libres, Clasificación y Carrera como si
          estuvieras en casa.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {affiliates.map((affiliate) => (
            <a
              key={affiliate.id}
              href={affiliate.amazon_url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-full bg-red px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-dim"
            >
              Probar {affiliate.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
