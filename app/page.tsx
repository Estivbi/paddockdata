import { GPCard } from "@/components/GPCard";
import { DatabaseSetupNotice } from "@/components/DatabaseSetupNotice";
import { getUpcomingCircuits } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const circuits = await getUpcomingCircuits();

    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-red">
            Temporada 2026
          </p>
          <h1 className="font-heading mt-2 text-4xl font-semibold sm:text-5xl">
            Cada Gran Premio, con todo lo que necesitas saber
          </h1>
          <p className="mt-4 text-text-muted">
            Agenda del fin de semana, cómo llegar al circuito y recomendaciones
            contextuales para cada cita del calendario que queda por delante.
          </p>
        </div>

        {circuits.length === 0 ? (
          <p className="mt-12 text-text-muted">
            No quedan Grandes Premios por disputar en 2026.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {circuits.map((circuit, index) => (
              <GPCard key={circuit.id} circuit={circuit} isNext={index === 0} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <DatabaseSetupNotice error={error} />;
  }
}
