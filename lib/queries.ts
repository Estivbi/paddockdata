import { sql } from "./db";
import type { Affiliate, Circuit, CircuitEvent } from "./types";

export async function getUpcomingCircuits(): Promise<Circuit[]> {
  const rows = await sql()`
    SELECT * FROM circuits
    WHERE race_date >= NOW()
    ORDER BY race_date ASC
  `;
  return rows as Circuit[];
}

export async function getAllCircuits(): Promise<Circuit[]> {
  const rows = await sql()`
    SELECT * FROM circuits
    ORDER BY race_date ASC
  `;
  return rows as Circuit[];
}

export async function getCircuitBySlug(slug: string): Promise<Circuit | null> {
  const rows = await sql()`
    SELECT * FROM circuits WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Circuit) ?? null;
}

export async function getEventsByCircuitId(
  circuitId: number
): Promise<CircuitEvent[]> {
  const rows = await sql()`
    SELECT * FROM events
    WHERE circuit_id = ${circuitId}
    ORDER BY day ASC, id ASC
  `;
  return rows as CircuitEvent[];
}

export async function getAffiliatesByCircuitId(
  circuitId: number
): Promise<Affiliate[]> {
  const rows = await sql()`
    SELECT * FROM affiliates
    WHERE circuit_id = ${circuitId}
    ORDER BY sort_order ASC, id ASC
  `;
  return rows as Affiliate[];
}

export async function getAllCircuitSlugs(): Promise<string[]> {
  const rows = await sql()`SELECT slug FROM circuits`;
  return (rows as { slug: string }[]).map((r) => r.slug);
}
