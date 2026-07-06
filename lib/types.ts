export type Coordinates = {
  lat: number;
  lng: number;
};

export type Circuit = {
  id: number;
  slug: string;
  name: string;
  country: string;
  city: string;
  track_length_km: string | null;
  corners: number | null;
  lap_record: string | null;
  race_date: string;
  qualifying_date: string | null;
  fp1_date: string | null;
  fp2_date: string | null;
  fp3_date: string | null;
  is_sprint: boolean;
  coordinates: Coordinates | null;
  timezone: string;
  hero_image_url: string | null;
  summary: string | null;
  how_to_arrive: string | null;
  local_info: string | null;
  created_at: string;
  updated_at: string;
};

export type EventType =
  | "fp1"
  | "fp2"
  | "fp3"
  | "sprint_qualifying"
  | "sprint"
  | "qualifying"
  | "race"
  | "support";

export type EventCategory =
  | "F1"
  | "F2"
  | "F3"
  | "Porsche Supercup"
  | "F1 Academy"
  | "Otro";

export type CircuitEvent = {
  id: number;
  circuit_id: number;
  day: string;
  time_label: string;
  name: string;
  category: EventCategory;
  type: EventType;
  is_confirmed: boolean;
  details: string | null;
  created_at: string;
};

export type AffiliateCategory =
  | "ropa"
  | "audio"
  | "accesorios"
  | "vpn"
  | "oficial"
  | "camping"
  | "electronica"
  | "otro";

export type Affiliate = {
  id: number;
  circuit_id: number | null;
  title: string;
  description: string | null;
  // No siempre es Amazon: vpn/oficial apuntan a la web propia del servicio.
  url: string;
  image_url: string | null;
  category: AffiliateCategory;
  sort_order: number;
  created_at: string;
};
