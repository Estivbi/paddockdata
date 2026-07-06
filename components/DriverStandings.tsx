import { Trophy } from "lucide-react";
import { getDriverStandings } from "@/lib/jolpica";

export async function DriverStandings() {
  const standings = await getDriverStandings(2026);

  // API caída o temporada sin resultados todavía: mejor no mostrar la
  // sección que mostrarla vacía o con un error.
  if (standings.length === 0) return null;

  const top10 = standings.slice(0, 10);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 className="font-heading flex items-center gap-2 text-3xl font-semibold">
        <Trophy className="h-6 w-6 text-red" />
        Clasificación de pilotos 2026
      </h2>
      <ul className="mt-6 space-y-2">
        {top10.map((s) => {
          const d = s.Driver;
          const team = s.Constructors[0];
          return (
            <li
              key={d.driverId}
              className="flex items-center gap-3 rounded-lg border border-border bg-bg-card px-4 py-2.5"
            >
              <span className="w-7 text-right font-heading text-xl font-bold text-red">
                {s.position}
              </span>
              <span className="w-9 text-center text-sm font-semibold text-text-muted">
                {d.permanentNumber ?? d.code ?? "—"}
              </span>
              <span className="flex-1 text-sm font-semibold">
                {d.givenName} <span className="text-red">{d.familyName.toUpperCase()}</span>
                {team && (
                  <span className="ml-2 text-xs font-normal text-text-muted">
                    {team.name}
                  </span>
                )}
              </span>
              <span className="text-sm font-semibold">{s.points} pts</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-text-muted">Datos: Jolpica (Ergast API)</p>
    </section>
  );
}
