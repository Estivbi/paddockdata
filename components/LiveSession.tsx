"use client";

import { useCallback, useEffect, useState } from "react";
import { Radio } from "lucide-react";

// OpenF1 responde bien a CORS desde el navegador (así lo consume MadRing
// también), así que esto pega directo al API en vez de pasar por Neon/Vercel.
const OPENF1_BASE = "https://api.openf1.org/v1";

type OpenF1Session = {
  session_name: string;
  meeting_name: string;
  date_start: string;
  date_end: string;
};

type OpenF1Driver = {
  driver_number: number;
  name_acronym: string;
  team_name: string;
  team_colour: string;
};

type OpenF1Position = {
  driver_number: number;
  position: number;
  date: string;
};

type OpenF1Interval = {
  driver_number: number;
  gap_to_leader?: number | null;
  date: string;
};

// /position e /intervals devuelven el histórico de la sesión, no solo el
// último valor: nos quedamos con la entrada más reciente por piloto.
function latestByDriver<T extends { driver_number: number; date: string }>(
  rows: T[]
): T[] {
  const latest: Record<number, T> = {};
  for (const row of rows) {
    if (!latest[row.driver_number] || row.date > latest[row.driver_number].date) {
      latest[row.driver_number] = row;
    }
  }
  return Object.values(latest);
}

export function LiveSession() {
  const [session, setSession] = useState<OpenF1Session | null>(null);
  const [drivers, setDrivers] = useState<OpenF1Driver[]>([]);
  const [positions, setPositions] = useState<OpenF1Position[]>([]);
  const [intervals, setIntervals] = useState<OpenF1Interval[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLive = useCallback(async () => {
    try {
      const [sessionRes, driversRes, posRes, intRes] = await Promise.all([
        fetch(`${OPENF1_BASE}/sessions?session_key=latest`),
        fetch(`${OPENF1_BASE}/drivers?session_key=latest`),
        fetch(`${OPENF1_BASE}/position?session_key=latest`),
        fetch(`${OPENF1_BASE}/intervals?session_key=latest`),
      ]);
      const [sessionData, driverData, posData, intData] = await Promise.all([
        sessionRes.json(),
        driversRes.json(),
        posRes.json(),
        intRes.json(),
      ]);
      setSession(Array.isArray(sessionData) ? (sessionData[0] ?? null) : null);
      setDrivers(Array.isArray(driverData) ? driverData : []);
      setPositions(
        latestByDriver(Array.isArray(posData) ? posData : []).sort(
          (a, b) => a.position - b.position
        )
      );
      setIntervals(latestByDriver(Array.isArray(intData) ? intData : []));
    } catch {
      // OpenF1 caído o sin red: se queda con lo último que tenía, no rompe la página.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLive();
    const id = setInterval(fetchLive, 10000);
    return () => clearInterval(id);
  }, [fetchLive]);

  // session_key=latest siempre devuelve algo, aunque sea de hace días. Solo
  // lo tratamos como "en directo" si ahora cae dentro de su ventana real.
  const now = Date.now();
  const isLive =
    session != null &&
    now >= new Date(session.date_start).getTime() &&
    now <= new Date(session.date_end).getTime();

  const driverMap = Object.fromEntries(drivers.map((d) => [d.driver_number, d]));
  const intervalMap = Object.fromEntries(intervals.map((iv) => [iv.driver_number, iv]));

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-3xl font-semibold">
        <Radio className="h-6 w-6 text-red" />
        Sesión en directo
      </h2>

      <div className="mt-6 rounded-xl border border-border bg-bg-card p-6">
        {loading ? (
          <p className="text-center text-sm text-text-muted">
            Conectando con F1 Live…
          </p>
        ) : !isLive || positions.length === 0 ? (
          <p className="text-center text-sm text-text-muted">
            No hay ninguna sesión en directo ahora mismo. Vuelve durante
            Libres, Clasificación o Carrera de este fin de semana.
          </p>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-red px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                En directo — {session.session_name} · {session.meeting_name}
              </span>
            </div>
            <ul className="space-y-1.5">
              {positions.map((p, i) => {
                const d = driverMap[p.driver_number];
                const iv = intervalMap[p.driver_number];
                return (
                  <li
                    key={p.driver_number}
                    className="flex items-center gap-3 rounded-lg border border-border bg-bg py-2 pl-3 pr-4"
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: d?.team_colour ? `#${d.team_colour}` : undefined,
                    }}
                  >
                    <span
                      className={`w-6 text-right font-heading text-lg font-bold ${
                        i === 0 ? "text-red" : "text-text-muted"
                      }`}
                    >
                      {p.position}
                    </span>
                    <span className="flex-1 text-sm font-semibold">
                      {d ? (
                        <>
                          <span className="mr-2 text-text-muted">
                            {d.driver_number}
                          </span>
                          {d.name_acronym}
                          <span className="ml-2 text-xs font-normal text-text-muted">
                            {d.team_name}
                          </span>
                        </>
                      ) : (
                        `#${p.driver_number}`
                      )}
                    </span>
                    <span className="text-xs text-text-muted">
                      {i === 0
                        ? "LÍDER"
                        : iv?.gap_to_leader != null
                          ? `+${iv.gap_to_leader.toFixed(3)}`
                          : "—"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-center text-xs text-text-muted">
              Actualiza cada 10s · Datos: OpenF1
            </p>
          </>
        )}
      </div>
    </section>
  );
}
