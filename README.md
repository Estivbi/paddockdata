# PaddockData

Web paraguas de Fórmula 1 con arquitectura Hub & Spoke: un Home con el
calendario de Grandes Premios y una página propia por circuito con la agenda
del fin de semana, cómo llegar, información local y afiliados contextuales.

## Stack

- **Next.js 15** (App Router)
- **Neon** (PostgreSQL serverless) vía `@neondatabase/serverless`
- **Tailwind CSS v4** + **lucide-react**
- **Jolpica** (sucesor de Ergast) para la clasificación de pilotos y **OpenF1**
  para timing en directo — ver sección [Datos en vivo](#datos-en-vivo)
- Despliegue en **Vercel**

## Puesta en marcha

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea un proyecto en [Neon](https://neon.tech) y copia la cadena de conexión.

3. Copia `.env.example` a `.env.local` y rellena `DATABASE_URL` y
   `AMAZON_ASSOCIATES_TAG`:

   ```bash
   cp .env.example .env.local
   ```

4. Aplica el esquema y los datos iniciales sobre tu base de Neon:

   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   psql "$DATABASE_URL" -f db/seed.sql
   ```

5. Arranca el entorno de desarrollo:

   ```bash
   npm run dev
   ```

Sin `DATABASE_URL` configurada, tanto el Home como las páginas de circuito
muestran un aviso explicando cómo completar la configuración en lugar de
romper el build.

## Estructura

```
app/
  page.tsx              Home: calendario de GPs restantes de 2026
  [circuit]/page.tsx     Página dinámica de cada circuito
  layout.tsx             Layout raíz (fuentes, header, footer)
  globals.css            Tema oscuro F1 (tokens de color, tipografías)
components/
  Header.tsx, Footer.tsx
  GPCard.tsx              Tarjeta de GP en el Home
  CircuitHero.tsx         Cabecera de la página de circuito
  WeekendAgenda.tsx       Agenda de sesiones del fin de semana
  InfoSection.tsx         Bloque reutilizable (cómo llegar / info local)
  AffiliateSection.tsx    Grid de afiliados de Amazon contextuales por circuito
  WatchOptions.tsx        Canales oficiales + VPN para ver la carrera (global)
  DriverStandings.tsx     Clasificación de pilotos 2026 (Jolpica) — Home
  LiveSession.tsx         Timing en directo (OpenF1) — solo en fin de semana de GP
  DatabaseSetupNotice.tsx Aviso cuando falta configurar Neon
lib/
  db.ts, queries.ts       Cliente Neon y acceso a datos
  types.ts                Tipos de circuits / events / affiliates
  format.ts               Formateo de fechas y countdown en español
  rich-text.tsx           Renderer ligero de texto enriquecido (sin HTML)
  affiliate.ts            Añade el Amazon Associates ID (env var) a los enlaces
  jolpica.ts              Cliente de la API de Jolpica (clasificación de pilotos)
db/
  schema.sql              DDL de circuits, events, affiliates
  seed.sql                 Datos de los 13 GPs restantes de 2026
```

## Datos

Los 13 Grandes Premios que quedan en la temporada 2026 están sembrados en
`db/seed.sql`, con **Spa-Francorchamps** (19 de julio) y **Budapest** (26 de
julio) desarrollados en profundidad: agenda de sesiones confirmada,
información de acceso/transporte, info local y afiliados de Amazon
contextuales según el clima de cada circuito.

El resto de circuitos incluyen fecha de carrera confirmada por el calendario
oficial y una agenda de sesiones estimada (marcada `is_confirmed = false` a
nivel de evento) hasta que la FIA publique el horario detallado de cada GP.

Madrid se deja intencionadamente con contenido mínimo: su cobertura completa
vive hoy en MadRing y se migrará más adelante.

**Importante**: `db/seed.sql` guarda los enlaces de Amazon sin etiqueta de
afiliado. El Amazon Associates ID real se añade en tiempo de renderizado
desde la variable de entorno `AMAZON_ASSOCIATES_TAG` (ver `lib/affiliate.ts`),
así nunca queda expuesto en el repositorio.

Los afiliados de `circuit_id = NULL` son globales y aparecen en todas las
páginas de circuito vía `WatchOptions`: los de categoría `oficial` (F1 TV,
DAZN F1) se muestran primero y sin ningún enlace de afiliado; los de
categoría `vpn` (NordVPN, ExpressVPN) se ofrecen después, como alternativa
para quien no tenga cobertura del canal oficial en su país.

## Datos en vivo

Dos APIs públicas de F1 (sin API key) alimentan datos que no viven en Neon,
tomadas del mismo patrón que ya usa MadRing:

- **Jolpica** (`api.jolpi.ca`, sucesor mantenido de la extinta Ergast API):
  clasificación de pilotos del campeonato. Se consulta desde el servidor
  (`lib/jolpica.ts`) con caché de 5 min, y se muestra en el Home vía
  `DriverStandings`. Si la API falla o la temporada aún no tiene resultados,
  la sección simplemente no se renderiza.
- **OpenF1** (`api.openf1.org`): timing en directo (posiciones, intervalos)
  durante una sesión. Se consulta desde el navegador (`components/LiveSession.tsx`,
  `"use client"`, con polling cada 10s) porque es un dato genuinamente en
  vivo, no algo que tenga sentido cachear en el servidor. El componente solo
  se monta en la página del circuito cuya ventana de fin de semana (FP1 →
  carrera + 1 día) incluye el momento actual, para no hacer polling los otros
  51 fines de semana del año en los que ese GP no corre. Aun montado, valida
  que la sesión que devuelve `session_key=latest` esté realmente en curso
  (`date_start` ≤ ahora ≤ `date_end`) antes de mostrarla como "en directo".

Ninguna de las dos APIs devuelve el trazado/mapa del circuito (solo timing y
clasificaciones) — eso hay que seguir sourceándolo aparte.
