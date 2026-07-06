import { Gauge, MapPin, Timer, TrendingUp } from "lucide-react";
import type { Circuit } from "@/lib/types";
import { countdownLabel, formatRaceDate, formatWeekday } from "@/lib/format";

export function CircuitHero({ circuit }: { circuit: Circuit }) {
  const stats = [
    circuit.track_length_km && {
      icon: TrendingUp,
      label: "Longitud",
      value: `${circuit.track_length_km} km`,
    },
    circuit.corners && {
      icon: Gauge,
      label: "Curvas",
      value: `${circuit.corners}`,
    },
    circuit.lap_record && {
      icon: Timer,
      label: "Récord de vuelta",
      value: circuit.lap_record,
    },
    // filter(Boolean) no estrecha el tipo por sí solo (sigue viendo `false`
    // como posible), de ahí el cast: ya sabemos que solo quedan objetos.
  ].filter(Boolean) as { icon: typeof Gauge; label: string; value: string }[];

  return (
    <section className="border-b border-border bg-gradient-to-b from-red/10 to-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="flex items-center gap-1.5 text-sm font-medium text-text-muted">
          <MapPin className="h-4 w-4" />
          {circuit.city}, {circuit.country}
        </p>
        <h1 className="font-heading mt-2 text-4xl font-semibold sm:text-5xl">
          {circuit.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-red px-3 py-1 text-sm font-semibold text-white">
            {countdownLabel(circuit.race_date, circuit.timezone)}
          </span>
          <span className="text-sm text-text-muted">
            {formatWeekday(circuit.race_date, circuit.timezone)}{" "}
            {formatRaceDate(circuit.race_date, circuit.timezone)}
          </span>
          {circuit.is_sprint && (
            <span className="rounded-full border border-border px-3 py-1 text-sm text-text-muted">
              Fin de semana Sprint
            </span>
          )}
        </div>

        {circuit.summary && (
          <p className="mt-6 max-w-2xl text-text-muted">{circuit.summary}</p>
        )}

        {stats.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:max-w-xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-bg-card p-4"
              >
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-text-muted">
                  <stat.icon className="h-3.5 w-3.5" />
                  {stat.label}
                </dt>
                <dd className="font-heading mt-1 text-lg font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
