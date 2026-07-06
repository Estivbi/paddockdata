// Jolpica es el sucesor mantenido de la extinta Ergast API: mismo formato de
// respuesta, mismos endpoints históricos y de temporada. Se llama desde el
// servidor (no desde el navegador) porque la clasificación no es un dato en
// vivo — solo cambia tras cada carrera.
const JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1";

export type DriverStanding = {
  position: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber?: string;
    code?: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructors: { name: string; constructorId: string }[];
};

export async function getDriverStandings(year: number): Promise<DriverStanding[]> {
  try {
    // 5 min de caché: suficiente para no golpear la API en cada request sin
    // servir datos desfasados en algo que solo cambia una vez por semana.
    const res = await fetch(`${JOLPICA_BASE}/${year}/driverStandings.json`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
  } catch {
    return [];
  }
}
