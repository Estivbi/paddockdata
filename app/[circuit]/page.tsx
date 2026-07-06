import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPinned, Truck } from "lucide-react";
import { CircuitHero } from "@/components/CircuitHero";
import { WeekendAgenda } from "@/components/WeekendAgenda";
import { InfoSection } from "@/components/InfoSection";
import { AffiliateSection } from "@/components/AffiliateSection";
import { WatchOptions } from "@/components/WatchOptions";
import { LiveSession } from "@/components/LiveSession";
import { DatabaseSetupNotice } from "@/components/DatabaseSetupNotice";
import {
  getAffiliatesByCircuitId,
  getCircuitBySlug,
  getEventsByCircuitId,
  getGlobalAffiliates,
} from "@/lib/queries";

// Sin esto, `next build` intenta pre-renderizar la ruta en build time y falla
// porque no hay DATABASE_URL disponible ahí. Con force-dynamic la consulta se
// hace en cada request, cuando el entorno (Vercel) ya tiene la variable.
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ circuit: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { circuit: slug } = await params;
  try {
    const circuit = await getCircuitBySlug(slug);
    if (!circuit) return {};
    return {
      title: `${circuit.name} — Gran Premio de ${circuit.country}`,
      description: circuit.summary ?? undefined,
    };
  } catch {
    return {};
  }
}

export default async function CircuitPage({ params }: PageProps) {
  const { circuit: slug } = await params;

  let data;
  try {
    const circuit = await getCircuitBySlug(slug);
    if (!circuit) notFound();

    const [events, affiliates, officialAffiliates, vpnAffiliates] =
      await Promise.all([
        getEventsByCircuitId(circuit.id),
        getAffiliatesByCircuitId(circuit.id),
        getGlobalAffiliates("oficial"),
        getGlobalAffiliates("vpn"),
      ]);

    data = { circuit, events, affiliates, officialAffiliates, vpnAffiliates };
  } catch (error) {
    return <DatabaseSetupNotice error={error} />;
  }

  const { circuit, events, affiliates, officialAffiliates, vpnAffiliates } =
    data;

  // OpenF1 solo tiene datos útiles mientras el circuito está en pista. Se
  // acota a [FP1, carrera + 1 día] para no montar el polling client-side los
  // otros 51 fines de semana del año en los que este GP no corre.
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const weekendStart = circuit.fp1_date
    ? new Date(circuit.fp1_date).getTime()
    : new Date(circuit.race_date).getTime() - ONE_DAY_MS;
  const weekendEnd = new Date(circuit.race_date).getTime() + ONE_DAY_MS;
  const now = Date.now();
  const isRaceWeekend = now >= weekendStart && now <= weekendEnd;

  return (
    <>
      <CircuitHero circuit={circuit} />
      <WeekendAgenda events={events} />
      {isRaceWeekend && <LiveSession />}
      {circuit.how_to_arrive && (
        <InfoSection
          id="como-llegar"
          icon={Truck}
          title="Cómo llegar"
          content={circuit.how_to_arrive}
        />
      )}
      {circuit.local_info && (
        <InfoSection
          id="info-local"
          icon={MapPinned}
          title="Info local"
          content={circuit.local_info}
        />
      )}
      <AffiliateSection
        title={`Recomendado para ${circuit.city}`}
        affiliates={affiliates}
      />
      <WatchOptions official={officialAffiliates} vpn={vpnAffiliates} />
    </>
  );
}
