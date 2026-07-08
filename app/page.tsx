import { GPCard } from "@/components/GPCard";
import { DriverStandings } from "@/components/DriverStandings";
import { DatabaseSetupNotice } from "@/components/DatabaseSetupNotice";
import { getUpcomingCircuits } from "@/lib/queries";

// Ver la nota en app/[circuit]/page.tsx: fuerza el fetch a request time para
// que el build no dependa de tener DATABASE_URL configurada.
export const dynamic = "force-dynamic";

// Aislado en su propio componente para que un fallo de Neon solo tumbe el
// calendario, no la clasificación de pilotos (que no depende de la BD).
async function CircuitCalendar() {
  try {
    const circuits = await getUpcomingCircuits();

    if (circuits.length === 0) {
      return (
        <p className="mt-8 text-sm text-text-muted">
          No quedan Grandes Premios por disputar en 2026.
        </p>
      );
    }

    return (
      <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {circuits.map((circuit, index) => (
          <GPCard key={circuit.id} circuit={circuit} isNext={index === 0} />
        ))}
      </div>
    );
  } catch (error) {
    return <DatabaseSetupNotice error={error} />;
  }
}

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-red">
            Temporada 2026
          </p>
          <h1 className="font-heading mt-2 text-[clamp(36px,9vw,64px)] font-black uppercase leading-[0.95] tracking-tight text-text">
            Cada Gran Premio, con todo lo que necesitas saber
          </h1>
          <p className="mt-3 text-sm text-text-muted">
            Agenda del fin de semana, cómo llegar al circuito y
            recomendaciones contextuales para cada cita del calendario que
            queda por delante.
          </p>
        </div>

        <CircuitCalendar />
      </div>

      <DriverStandings />
    </>
  );
}
