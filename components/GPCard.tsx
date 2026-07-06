import Link from "next/link";
import { MapPin, Zap } from "lucide-react";
import type { Circuit } from "@/lib/types";
import { countdownLabel, formatRaceDate, formatWeekday } from "@/lib/format";

export function GPCard({
  circuit,
  isNext,
}: {
  circuit: Circuit;
  isNext: boolean;
}) {
  const countdown = countdownLabel(circuit.race_date);

  return (
    <Link
      href={`/${circuit.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-5 transition hover:-translate-y-0.5 hover:border-red/60 ${
        isNext
          ? "border-red/70 bg-gradient-to-br from-red/15 via-bg-card to-bg-card"
          : "border-border bg-bg-card"
      }`}
    >
      {isNext && (
        <span className="absolute right-4 top-4 rounded-full bg-red px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Próxima carrera
        </span>
      )}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {formatWeekday(circuit.race_date)} · {formatRaceDate(circuit.race_date)}
        </p>
        <h3 className="font-heading mt-1 text-2xl font-semibold leading-tight text-text">
          {circuit.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
          <MapPin className="h-3.5 w-3.5" />
          {circuit.city}, {circuit.country}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${
            isNext ? "text-red" : "text-text-muted"
          }`}
        >
          {countdown}
        </span>
        {circuit.is_sprint && (
          <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-text-muted">
            <Zap className="h-3 w-3" />
            Sprint
          </span>
        )}
      </div>
    </Link>
  );
}
