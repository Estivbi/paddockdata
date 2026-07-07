"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; mins: number; secs: number };

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

/**
 * Countdown al estilo MadRing Guide: cajas bg-bg-elevated con borde,
 * número gigante en Barlow 900, separador ":" en rojo.
 *
 * raceDate: ISO string (circuit.race_date, ya viene en UTC desde Postgres).
 */
export function Countdown({ raceDate }: { raceDate: string }) {
  const target = new Date(raceDate).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // Evita mismatch de hidratación: no se conoce "ahora" hasta montar en cliente.
  if (!time) return <div className="h-[62px]" aria-hidden />;

  if (time.days === 0 && time.hours === 0 && time.mins === 0 && time.secs === 0) {
    return null;
  }

  const units = [
    { value: time.days, label: "días" },
    { value: time.hours, label: "horas" },
    { value: time.mins, label: "min" },
    { value: time.secs, label: "seg" },
  ];

  return (
    <div className="flex gap-1" role="timer" aria-label="Cuenta atrás hasta la carrera">
      {units.map((unit, i) => (
        <div key={unit.label} className="contents">
          <div className="min-w-[52px] rounded-md border border-border bg-bg-elevated px-2.5 py-2 text-center">
            <div className="font-heading tabular text-2xl font-black leading-none text-text">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-wider text-text-muted">
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="font-heading pt-2.5 text-2xl font-black text-red">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
