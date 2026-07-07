import { MapPin } from "lucide-react";
import type { Circuit } from "@/lib/types";
import { formatRaceDate, formatWeekday } from "@/lib/format";
import { Countdown } from "@/components/Countdown";

// Mapa de accesos rápidos a las otras secciones de la página. Se muestran
// siempre; cada `InfoSection`/`AffiliateSection` decide luego si renderiza
// contenido según lo que traiga la BD, así que el link simplemente ancla ahí.
const QUICK_LINKS = [
  { num: "01", href: "#agenda", title: "Agenda", desc: "Horarios de libres, clasificación y carrera" },
  { num: "02", href: "#como-llegar", title: "Cómo llegar", desc: "Aeropuerto, parkings y transporte" },
  { num: "03", href: "#info-local", title: "Info local", desc: "Qué hay alrededor del circuito" },
  { num: "04", href: "#recomendados", title: "Recomendados", desc: "Todo lo que te puede hacer falta" },
];

export function CircuitHero({ circuit }: { circuit: Circuit }) {
  const stats = [
    circuit.track_length_km && { label: "Longitud", value: `${circuit.track_length_km} km` },
    circuit.corners && { label: "Curvas", value: `${circuit.corners}` },
    circuit.lap_record && { label: "Récord", value: circuit.lap_record },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pb-6 pt-8 sm:px-6">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-red">
          <MapPin className="h-3.5 w-3.5" />
          {circuit.city}, {circuit.country}
        </p>

        <h1 className="font-heading mt-2 text-[clamp(40px,10vw,72px)] font-black uppercase leading-[0.9] tracking-tight text-text">
          {circuit.name}
        </h1>

        <p className="mt-3 text-[13px] text-text-muted">
          {formatWeekday(circuit.race_date, circuit.timezone)}{" "}
          {formatRaceDate(circuit.race_date, circuit.timezone)}
          {circuit.is_sprint && (
            <span className="ml-2 rounded border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide">
              Sprint
            </span>
          )}
        </p>

        {/*
          Hueco para el trazado real del circuito en SVG. Sustituye el path
          de ejemplo por el trazado que busques — mantén el viewBox o
          ajústalo al de tu archivo, y el stroke hereda currentColor.
        */}
        <svg
          viewBox="0 0 300 200"
          className="mx-auto my-5 w-1/2 max-w-[220px] text-text/80"
          fill="none"
          aria-hidden
        >
          <path
            d="M20 140 C20 100 40 60 90 55 C130 50 140 90 175 85 C210 80 210 40 250 40 C280 40 285 70 260 85 C230 100 235 130 200 135 C160 140 155 110 120 115 C80 120 70 150 40 150 C25 150 20 148 20 140 Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className="mt-1">
          <Countdown raceDate={circuit.race_date} />
        </div>

        {stats.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[10px] uppercase tracking-wide text-text-muted">
                  {stat.label}
                </dt>
                <dd className="font-heading text-lg font-bold text-text">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {circuit.summary && (
          <p className="mt-6 max-w-2xl text-text-muted">{circuit.summary}</p>
        )}

        {/* Grid de accesos rápidos, patrón "número fantasma" de MadRing */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:max-w-xl">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.num}
              href={link.href}
              className="rounded-[10px] border border-border bg-bg-elevated p-4 transition hover:border-red/60"
            >
              <div className="ghost-num text-4xl">{link.num}</div>
              <div className="font-heading mt-1 text-base font-bold uppercase leading-tight text-text">
                {link.title}
              </div>
              <div className="mt-1 text-xs leading-snug text-text-muted">
                {link.desc}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
