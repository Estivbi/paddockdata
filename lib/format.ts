// Formateamos en UTC a propósito: events.day es una columna DATE (sin hora) y
// llega como "2026-07-17", que new Date() interpreta como medianoche UTC. Si
// formateáramos en la zona horaria del servidor, un servidor en América vería
// el día anterior.
const DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  timeZone: "UTC",
});

export function formatRaceDate(isoDate: string): string {
  return DATE_FORMATTER.format(new Date(isoDate));
}

export function formatWeekday(isoDate: string): string {
  const label = WEEKDAY_FORMATTER.format(new Date(isoDate));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function daysUntil(isoDate: string): number {
  const now = new Date();
  const target = new Date(isoDate);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function countdownLabel(isoDate: string): string {
  const days = daysUntil(isoDate);
  if (days < 0) return "Finalizado";
  if (days === 0) return "¡Es hoy!";
  if (days === 1) return "Mañana";
  return `Faltan ${days} días`;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  fp1: "Libres 1",
  fp2: "Libres 2",
  fp3: "Libres 3",
  sprint_qualifying: "Clasificación Sprint",
  sprint: "Sprint",
  qualifying: "Clasificación",
  race: "Carrera",
  support: "Soporte",
};

export function eventTypeLabel(type: string): string {
  return EVENT_TYPE_LABELS[type] ?? type;
}
