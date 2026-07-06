-- PaddockData — schema Neon (PostgreSQL)
-- Arquitectura Hub & Spoke: un circuito (spoke) por Gran Premio.

CREATE TABLE IF NOT EXISTS circuits (
  id               SERIAL PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  country          TEXT NOT NULL,
  city             TEXT NOT NULL,
  track_length_km  NUMERIC(5, 3),
  corners          SMALLINT,
  lap_record       TEXT,
  race_date        TIMESTAMPTZ NOT NULL,
  qualifying_date  TIMESTAMPTZ,
  fp1_date         TIMESTAMPTZ,
  fp2_date         TIMESTAMPTZ,
  fp3_date         TIMESTAMPTZ,
  is_sprint        BOOLEAN NOT NULL DEFAULT FALSE,
  coordinates      JSONB,               -- { "lat": 50.4372, "lng": 5.9714 }
  timezone         TEXT NOT NULL DEFAULT 'UTC',
  hero_image_url   TEXT,
  summary          TEXT,                -- resumen corto para el home
  how_to_arrive    TEXT,                -- markdown/texto largo: acceso y transporte
  local_info       TEXT,                -- markdown/texto largo: info local (clima, alojamiento, consejos)
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_circuits_race_date ON circuits (race_date);

CREATE TABLE IF NOT EXISTS events (
  id            SERIAL PRIMARY KEY,
  circuit_id    INTEGER NOT NULL REFERENCES circuits (id) ON DELETE CASCADE,
  day           DATE NOT NULL,
  time_label    TEXT NOT NULL,          -- "16:00 - 17:00 CEST"
  name          TEXT NOT NULL,          -- "Clasificación", "Entrenamientos Libres 2"
  category      TEXT NOT NULL DEFAULT 'F1'
                  CHECK (category IN ('F1', 'F2', 'F3', 'Porsche Supercup', 'F1 Academy', 'Otro')),
  type          TEXT NOT NULL
                  CHECK (type IN ('fp1', 'fp2', 'fp3', 'sprint_qualifying', 'sprint', 'qualifying', 'race', 'support')),
  is_confirmed  BOOLEAN NOT NULL DEFAULT TRUE,
  details       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_circuit_id ON events (circuit_id);
CREATE INDEX IF NOT EXISTS idx_events_day ON events (circuit_id, day);

-- No todo lo que vive aquí es "de Amazon": vpn y oficial enlazan a webs propias
-- de esos servicios (NordVPN, F1TV...), por eso la columna se llama url y no
-- amazon_url. category es TEXT + CHECK en vez de un ENUM de Postgres porque
-- añadir un valor nuevo es un ALTER TABLE de una línea, no una migración de tipo.
CREATE TABLE IF NOT EXISTS affiliates (
  id            SERIAL PRIMARY KEY,
  circuit_id    INTEGER REFERENCES circuits (id) ON DELETE CASCADE, -- NULL = afiliado global (vpn, oficial)
  title         TEXT NOT NULL,
  description   TEXT,
  url           TEXT NOT NULL,
  image_url     TEXT,
  category      TEXT NOT NULL
                  CHECK (category IN ('ropa', 'audio', 'accesorios', 'vpn', 'oficial', 'camping', 'electronica', 'otro')),
  sort_order    SMALLINT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliates_circuit_id ON affiliates (circuit_id);
