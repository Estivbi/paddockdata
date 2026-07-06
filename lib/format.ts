// Dos tipos de fecha conviven en la app y necesitan trato distinto:
//
// 1. events.day es una columna DATE (sin hora), llega como "2026-07-17".
//    new Date() la interpreta como medianoche UTC, así que hay que formatear
//    en UTC (el valor por defecto de timeZone) o el día se desplaza según la
//    zona horaria del servidor.
//
// 2. circuits.race_date es TIMESTAMPTZ. Postgres normaliza esto a UTC al
//    guardarlo: el offset local con el que se insertó (p.ej. -08:00 en Las
//    Vegas) no vuelve en la respuesta. Formatear eso en UTC puede mostrar el
//    día de calendario equivocado (una carrera a las 20:00 hora de Las Vegas
//    cae en las 04:00 UTC del día siguiente). Para estos casos hay que pasar
//    el IANA timezone del circuito (circuit.timezone) explícitamente.

function zonedYMD(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return { y: Number(map.year), m: Number(map.month), d: Number(map.day) };
}

// Medianoche UTC "sintética" que representa el día de calendario visto desde
// timeZone, para poder restar dos fechas en días completos sin arrastrar
// horas ni líos de horario de verano.
function zonedStartOfDay(date: Date, timeZone: string): Date {
  const { y, m, d } = zonedYMD(date, timeZone);
  return new Date(Date.UTC(y, m - 1, d));
}

export function formatRaceDate(isoDate: string, timeZone = "UTC"): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    timeZone,
  }).format(new Date(isoDate));
}

export function formatWeekday(isoDate: string, timeZone = "UTC"): string {
  const label = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    timeZone,
  }).format(new Date(isoDate));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function daysUntil(isoDate: string, timeZone = "UTC"): number {
  const now = zonedStartOfDay(new Date(), timeZone);
  const target = zonedStartOfDay(new Date(isoDate), timeZone);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function countdownLabel(isoDate: string, timeZone = "UTC"): string {
  const days = daysUntil(isoDate, timeZone);
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
