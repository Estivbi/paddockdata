import { Trophy } from "lucide-react";
import { getDriverStandings } from "@/lib/jolpica";

export async function DriverStandings() {
  const standings = await getDriverStandings(2026);

  // API caída o temporada sin resultados todavía: mejor no mostrar la
  // sección que mostrarla vacía o con un error.
  if (standings.length === 0) return null;

  const top10 = standings.slice(0, 10);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-xl font-black uppercase tracking-wide text-text">
        <Trophy className="h-5 w-5 text-red" />
        Clasificación de pilotos 2026
      </h2>
      <ul className="mt-5 space-y-2">
        {top10.map((s) => {
          const d = s.Driver;
          const team = s.Constructors[0];
          return (
            <li
              key={d.driverId}
              className="flex items-center gap-3 rounded-[10px] border border-border bg-bg-elevated px-4 py-2.5"
            >
              <span className="tabular w-7 text-right font-heading text-lg font-black text-red">
                {s.position}
              </span>
              <span className="w-9 text-center text-xs font-semibold text-text-muted">
                {d.permanentNumber ?? d.code ?? "—"}
              </span>
              <span className="flex-1 text-sm font-semibold text-text">
                {d.givenName} <span className="text-red">{d.familyName.toUpperCase()}</span>
                {team && (
                  <span className="ml-2 text-xs font-normal text-text-muted">
                    {team.name}
                  </span>
                )}
              </span>
              <span className="tabular text-sm font-semibold text-text">
                {s.points} pts
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] text-text-muted">Datos: Jolpica (Ergast API)</p>
    </section>
  );
}
