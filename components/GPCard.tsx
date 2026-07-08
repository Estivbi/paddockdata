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
  const countdown = countdownLabel(circuit.race_date, circuit.timezone);

  return (
    <Link
      href={`/${circuit.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[10px] border p-4 transition hover:-translate-y-0.5 hover:border-red/60 ${
        isNext
          ? "border-red/70 bg-gradient-to-br from-red/15 via-bg-elevated to-bg-elevated"
          : "border-border bg-bg-elevated"
      }`}
    >
      {isNext && (
        <span className="absolute right-3 top-3 rounded-full bg-red px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Próxima carrera
        </span>
      )}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
          {formatWeekday(circuit.race_date, circuit.timezone)} ·{" "}
          {formatRaceDate(circuit.race_date, circuit.timezone)}
        </p>
        <h3 className="font-heading mt-1 text-xl font-black uppercase leading-tight text-text">
          {circuit.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-text-muted">
          <MapPin className="h-3 w-3" />
          {circuit.city}, {circuit.country}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`tabular text-xs font-semibold ${
            isNext ? "text-red" : "text-text-muted"
          }`}
        >
          {countdown}
        </span>
        {circuit.is_sprint && (
          <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-text-muted">
            <Zap className="h-3 w-3" />
            Sprint
          </span>
        )}
      </div>
    </Link>
  );
}
