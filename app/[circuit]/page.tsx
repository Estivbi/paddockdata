import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPinned, Truck } from "lucide-react";
import { CircuitHero } from "@/components/CircuitHero";
import { WeekendAgenda } from "@/components/WeekendAgenda";
import { InfoSection } from "@/components/InfoSection";
import { AffiliateSection } from "@/components/AffiliateSection";
import { DatabaseSetupNotice } from "@/components/DatabaseSetupNotice";
import {
  getAffiliatesByCircuitId,
  getCircuitBySlug,
  getEventsByCircuitId,
} from "@/lib/queries";

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

    const [events, affiliates] = await Promise.all([
      getEventsByCircuitId(circuit.id),
      getAffiliatesByCircuitId(circuit.id),
    ]);

    data = { circuit, events, affiliates };
  } catch (error) {
    return <DatabaseSetupNotice error={error} />;
  }

  const { circuit, events, affiliates } = data;

  return (
    <>
      <CircuitHero circuit={circuit} />
      <WeekendAgenda events={events} />
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
    </>
  );
}
