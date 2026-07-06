import { CalendarClock, CircleAlert } from "lucide-react";
import type { CircuitEvent } from "@/lib/types";
import { eventTypeLabel, formatRaceDate, formatWeekday } from "@/lib/format";

// Solo carrera y sprint llevan el resaltado en rojo: son las dos sesiones que
// reparten puntos de campeonato, el resto es preparación.
const RACE_WEEKEND_TYPES = new Set(["race", "sprint"]);

export function WeekendAgenda({ events }: { events: CircuitEvent[] }) {
  if (events.length === 0) return null;

  const days = Array.from(new Set(events.map((e) => e.day))).sort();

  return (
    <section id="agenda" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-3xl font-semibold">
        <CalendarClock className="h-6 w-6 text-red" />
        Agenda del fin de semana
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.day === day);
          return (
            <div
              key={day}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                {formatWeekday(day)}
              </p>
              <p className="font-heading text-xl font-semibold">
                {formatRaceDate(day)}
              </p>
              <ul className="mt-4 space-y-3">
                {dayEvents.map((event) => (
                  <li
                    key={event.id}
                    className={`rounded-lg border p-3 ${
                      RACE_WEEKEND_TYPES.has(event.type)
                        ? "border-red/50 bg-red/10"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold">
                        {event.name || eventTypeLabel(event.type)}
                      </span>
                      {!event.is_confirmed && (
                        <span
                          title="Horario provisional, pendiente de confirmación oficial"
                          className="flex shrink-0 items-center gap-1 text-xs text-text-muted"
                        >
                          <CircleAlert className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-text-muted">
                      {event.time_label}
                    </p>
                    {event.category !== "F1" && (
                      <p className="mt-1 text-xs text-text-muted">
                        {event.category}
                      </p>
                    )}
                    {event.details && (
                      <p className="mt-1 text-xs text-text-muted">
                        {event.details}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
