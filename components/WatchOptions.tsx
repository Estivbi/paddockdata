import { ShieldCheck, Tv } from "lucide-react";
import type { Affiliate } from "@/lib/types";

// Canales oficiales primero: es la vía legal y la recomendación por defecto.
// La VPN se ofrece solo como alternativa para quien no tenga cobertura, nunca
// como forma de saltarse una suscripción de pago.
export function WatchOptions({
  official,
  vpn,
}: {
  official: Affiliate[];
  vpn: Affiliate[];
}) {
  if (official.length === 0 && vpn.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-xl font-black uppercase tracking-wide text-text">
        <Tv className="h-5 w-5 text-red" />
        Cómo ver este Gran Premio
      </h2>

      {official.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {official.map((affiliate) => (
            <a
              key={affiliate.id}
              href={affiliate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-[10px] border border-border bg-bg-elevated p-4 transition hover:border-red/60"
            >
              <h3 className="font-heading text-base font-bold uppercase leading-snug text-text">
                {affiliate.title}
              </h3>
              {affiliate.description && (
                <p className="mt-1 text-xs text-text-muted">
                  {affiliate.description}
                </p>
              )}
            </a>
          ))}
        </div>
      )}

      {vpn.length > 0 && (
        <div className="mt-5 rounded-[10px] border border-red/40 bg-red/10 p-6 sm:p-7">
          <h3 className="font-heading flex items-center gap-2 text-base font-black uppercase tracking-wide text-text">
            <ShieldCheck className="h-4 w-4 text-red" />
            ¿Sin cobertura en tu país?
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Si el canal oficial no está disponible donde estás, una VPN te
            permite seguir Libres, Clasificación y Carrera como si estuvieras
            en casa.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {vpn.map((affiliate) => (
              <a
                key={affiliate.id}
                href={affiliate.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="rounded-full bg-red px-5 py-2 text-xs font-semibold text-white transition hover:bg-red-dim"
              >
                Probar {affiliate.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
