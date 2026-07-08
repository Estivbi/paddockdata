import { CalendarClock, CircleAlert } from "lucide-react";
import type { CircuitEvent } from "@/lib/types";
import { eventTypeLabel, formatRaceDate, formatWeekday } from "@/lib/format";

const RACE_WEEKEND_TYPES = new Set(["race", "sprint"]);

export function WeekendAgenda({ events }: { events: CircuitEvent[] }) {
  if (events.length === 0) return null;

  const days = Array.from(new Set(events.map((e) => e.day))).sort();

  return (
    <section id="agenda" className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-text">
        <CalendarClock className="h-5 w-5 text-red" />
        Agenda del fin de semana
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.day === day);
          return (
            <div key={day}>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                {formatWeekday(day)}
              </p>
              <p className="font-heading text-lg font-bold text-text">
                {formatRaceDate(day)}
              </p>

              <ul className="mt-3 space-y-2">
                {dayEvents.map((event) => {
                  const isRaceWeekend = RACE_WEEKEND_TYPES.has(event.type);
                  return (
                    <li
                      key={event.id}
                      className={`rounded-[10px] border-l-2 bg-bg-elevated p-3 ${
                        isRaceWeekend ? "border-l-red" : "border-l-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-text">
                          {event.name || eventTypeLabel(event.type)}
                        </span>
                        {!event.is_confirmed && (
                          <span
                            title="Horario provisional, pendiente de confirmación oficial"
                            className="flex shrink-0 items-center gap-1 text-text-muted"
                          >
                            <CircleAlert className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="tabular mt-1 text-sm text-text-muted">
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
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
