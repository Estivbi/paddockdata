-- PaddockData — datos iniciales (temporada F1 2026)
-- Fechas de carrera confirmadas por el calendario oficial FIA/F1 (abril 2026).
-- Los horarios de sesiones de circuitos distintos de Spa son estimaciones basadas
-- en el formato estándar de fin de semana y están marcados is_confirmed = false
-- hasta que la FIA publique el horario detallado de cada GP.
--
-- Las categorías ropa/audio/accesorios/camping/electronica/otro son productos
-- de Amazon; sus URLs se guardan SIN etiqueta de afiliado, que se añade en
-- tiempo de renderizado desde AMAZON_ASSOCIATES_TAG (lib/affiliate.ts) y nunca
-- se guarda en la base de datos ni en el repositorio. vpn y oficial son enlaces
-- directos a esos servicios, sin lógica de tag.

-- =========================================================
-- 1. Spa-Francorchamps — Gran Premio de Bélgica (19 julio 2026) — URGENTE
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'spa-francorchamps',
  'Circuit de Spa-Francorchamps',
  'Bélgica',
  'Stavelot',
  7.004,
  19,
  '1:41.252 — Valtteri Bottas (Mercedes, 2018)',
  '2026-07-19T15:00:00+02:00',
  '2026-07-18T16:00:00+02:00',
  '2026-07-17T12:30:00+02:00',
  '2026-07-17T16:00:00+02:00',
  '2026-07-18T11:30:00+02:00',
  FALSE,
  '{"lat": 50.4372, "lng": 5.9714}',
  'Europe/Brussels',
  'El templo de las Ardenas: Eau Rouge, Raidillon y un clima que puede cambiar cuatro veces en una vuelta. Uno de los trazados más rápidos y respetados del calendario.',
  E'**En coche**: Spa está a ~1h45 de Bruselas y ~2h15 de Colonia por autopista (E42/A27). Hay parkings oficiales (P1-P9) a las afueras de Stavelot y Francorchamps con shuttle gratuito al circuito; se agotan pronto, reserva con antelación.\n\n**En tren + shuttle**: la estación más cercana es Verviers (o Spa, con menos frecuencia). Desde Verviers hay shuttles oficiales del circuito los días de sesión.\n\n**En avión**: los aeropuertos más prácticos son Bruselas (BRU, ~1h45), Lieja (LGG, ~45 min) y Colonia-Bonn (CGN, ~1h30).\n\n**A pie/bici**: el pueblo de Francorchamps y Stavelot quedan a 20-30 min andando de las entradas norte; muchos aficionados acampan en los alrededores.',
  E'**Clima**: las Ardenas son impredecibles incluso en julio — lleva siempre capa impermeable, puede llover con sol brillando 10 minutos después. Temperaturas medias 12-22°C.\n\n**Alojamiento**: Spa, Stavelot y Malmedy se llenan meses antes; Lieja y Verviers (30-40 min) suelen tener más disponibilidad y mejor precio.\n\n**Entradas**: las gradas de Kemmel (tras Eau Rouge/Raidillon) y Blanchimont son las más solicitadas por la vista y el ambiente.'
);

-- Eventos del fin de semana de Spa (horario confirmado)
INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-07-17'::date, '12:30 - 13:30 CEST', 'Entrenamientos Libres 1', 'F1', 'fp1', TRUE, NULL FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, '2026-07-17'::date, '16:00 - 17:00 CEST', 'Entrenamientos Libres 2', 'F1', 'fp2', TRUE, NULL FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, '2026-07-18'::date, '11:30 - 12:30 CEST', 'Entrenamientos Libres 3', 'F1', 'fp3', TRUE, NULL FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, '2026-07-18'::date, '16:00 - 17:00 CEST', 'Clasificación', 'F1', 'qualifying', TRUE, NULL FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, '2026-07-19'::date, '15:00 CEST', 'Carrera — Gran Premio de Bélgica', 'F1', 'race', TRUE, '44 vueltas o 120 minutos (lo que ocurra antes).' FROM circuits WHERE slug = 'spa-francorchamps';

-- Afiliados contextuales de Spa (clima muy variable → impermeables, capas, protección de electrónica)
INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order)
SELECT id, 'Poncho impermeable compacto para circuito', 'El clima de las Ardenas cambia en minutos: un poncho plegable de bolsillo es imprescindible en las gradas de Spa.', 'https://www.amazon.es/s?k=poncho+impermeable+compacto', NULL, 'accesorios', 1 FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, 'Auriculares intraurales con protección auditiva', 'Los V6 turbo híbridos superan los 130 dB en recta; unos auriculares con filtro de atenuación protegen el oído durante todo el fin de semana.', 'https://www.amazon.es/s?k=auriculares+proteccion+auditiva+circuito', NULL, 'audio', 2 FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, 'Prismáticos compactos para gradas de Kemmel', 'Eau Rouge-Raidillon se ve mejor con algo de aumento: unos prismáticos ligeros marcan la diferencia desde Kemmel o Blanchimont.', 'https://www.amazon.es/s?k=prismaticos+compactos+eventos+deportivos', NULL, 'accesorios', 3 FROM circuits WHERE slug = 'spa-francorchamps'
UNION ALL
SELECT id, 'Camiseta técnica transpirable', 'Para las horas de pie bajo sol o lluvia; secado rápido y protección UV.', 'https://www.amazon.es/s?k=camiseta+tecnica+transpirable+deporte', NULL, 'ropa', 4 FROM circuits WHERE slug = 'spa-francorchamps';

-- =========================================================
-- 2. Hungaroring — Gran Premio de Hungría (26 julio 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'budapest',
  'Hungaroring',
  'Hungría',
  'Mogyoród (Budapest)',
  4.381,
  14,
  '1:16.627 — Lewis Hamilton (Mercedes, 2020)',
  '2026-07-26T15:00:00+02:00',
  '2026-07-25T16:00:00+02:00',
  '2026-07-24T12:30:00+02:00',
  '2026-07-24T16:00:00+02:00',
  '2026-07-25T11:30:00+02:00',
  FALSE,
  '{"lat": 47.5789, "lng": 19.2486}',
  'Europe/Budapest',
  'Un trazado sinuoso y estrecho, apodado "el Mónaco sin muros", a 20 km del centro de Budapest.',
  E'**En coche**: 20-25 min desde el centro de Budapest por la M3.\n\n**Shuttle oficial**: bus lanzadera desde varias estaciones de metro de Budapest los días de sesión.\n\n**En avión**: aeropuerto de Budapest-Ferenc Liszt (BUD), ~35 min al circuito.',
  E'**Clima**: veranos calurosos y húmedos, 25-33°C habituales en julio — hidratación y protección solar son clave.\n\n**Alojamiento**: quedarse en Budapest (Pest) y usar el shuttle oficial suele ser más cómodo y barato que los hoteles cerca del circuito.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-07-24'::date, '12:30 - 13:30 CEST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'budapest'
UNION ALL
SELECT id, '2026-07-24'::date, '16:00 - 17:00 CEST', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'budapest'
UNION ALL
SELECT id, '2026-07-25'::date, '11:30 - 12:30 CEST', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'budapest'
UNION ALL
SELECT id, '2026-07-25'::date, '16:00 - 17:00 CEST', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'budapest'
UNION ALL
SELECT id, '2026-07-26'::date, '15:00 CEST', 'Carrera — Gran Premio de Hungría', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'budapest';

INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order)
SELECT id, 'Gorra transpirable con protección UV', 'El Hungaroring pega de lleno el sol de julio en las gradas; una gorra técnica es casi obligatoria.', 'https://www.amazon.es/s?k=gorra+transpirable+proteccion+solar', NULL, 'ropa', 1 FROM circuits WHERE slug = 'budapest'
UNION ALL
SELECT id, 'Botella térmica reutilizable', 'Con 30°C y humedad alta, mantener el agua fría todo el día evita golpes de calor en las gradas.', 'https://www.amazon.es/s?k=botella+termica+reutilizable+deporte', NULL, 'accesorios', 2 FROM circuits WHERE slug = 'budapest';

-- =========================================================
-- 3. Zandvoort — Gran Premio de los Países Bajos (23 agosto 2026) — fin de semana sprint
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'zandvoort',
  'Circuit Zandvoort',
  'Países Bajos',
  'Zandvoort',
  4.259,
  14,
  '1:11.097 — Lewis Hamilton (Mercedes, 2021)',
  '2026-08-23T15:00:00+02:00',
  '2026-08-21T16:00:00+02:00',
  '2026-08-21T12:30:00+02:00',
  NULL,
  NULL,
  TRUE,
  '{"lat": 52.3888, "lng": 4.5409}',
  'Europe/Amsterdam',
  'Peraltes de banking al estilo NASCAR pegado a las dunas del Mar del Norte. Fin de semana con formato sprint.',
  E'**En tren + bici**: la forma habitual de llegar es tren hasta Haarlem y luego bici o shuttle hasta el circuito; Zandvoort restringe el acceso en coche los días de carrera.\n\n**En avión**: Ámsterdam Schiphol (AMS), ~45 min en tren+shuttle.',
  E'**Clima**: costa del Mar del Norte, viento y cambios rápidos de tiempo; lleva cortavientos.\n\n**Formato sprint**: viernes hay clasificación para la carrera del domingo; sábado se disputan la sprint qualifying y la sprint.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-08-21'::date, '12:30 - 13:30 CEST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'zandvoort'
UNION ALL
SELECT id, '2026-08-21'::date, '16:00 - 17:00 CEST', 'Clasificación (parrilla del domingo)', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'zandvoort'
UNION ALL
SELECT id, '2026-08-22'::date, '11:30 - 12:15 CEST', 'Clasificación Sprint (parrilla de la sprint)', 'F1', 'sprint_qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'zandvoort'
UNION ALL
SELECT id, '2026-08-22'::date, '15:30 - 16:15 CEST', 'Carrera Sprint', 'F1', 'sprint', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'zandvoort'
UNION ALL
SELECT id, '2026-08-23'::date, '15:00 CEST', 'Carrera — Gran Premio de los Países Bajos', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026. Último Gran Premio de Holanda anunciado en el calendario.' FROM circuits WHERE slug = 'zandvoort';

INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order)
SELECT id, 'Cortavientos ligero plegable', 'El viento del Mar del Norte se nota en cada peralte; un cortavientos compacto es el mejor amigo en Zandvoort.', 'https://www.amazon.es/s?k=cortavientos+ligero+plegable', NULL, 'ropa', 1 FROM circuits WHERE slug = 'zandvoort'
UNION ALL
SELECT id, 'Mochila impermeable pequeña', 'Para llevar cámara, capa extra y snacks entre la estación y el circuito sin depender del coche.', 'https://www.amazon.es/s?k=mochila+impermeable+pequena+eventos', NULL, 'accesorios', 2 FROM circuits WHERE slug = 'zandvoort';

-- =========================================================
-- 4. Monza — Gran Premio de Italia (6 septiembre 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'monza',
  'Autodromo Nazionale Monza',
  'Italia',
  'Monza',
  5.793,
  11,
  '1:21.046 — Rubens Barrichello (Ferrari, 2004)',
  '2026-09-06T15:00:00+02:00',
  '2026-09-05T16:00:00+02:00',
  '2026-09-04T12:30:00+02:00',
  '2026-09-04T16:00:00+02:00',
  '2026-09-05T11:30:00+02:00',
  FALSE,
  '{"lat": 45.6156, "lng": 9.2811}',
  'Europe/Rome',
  'El Templo de la Velocidad: rectas larguísimas dentro del Parco di Monza y la marea roja de los tifosi.',
  E'**En tren**: trenes directos desde Milán Centrale/Garibaldi hasta Monza, luego bus lanzadera o 20 min andando por el parque.\n\n**En avión**: Milán Malpensa (MXP) o Linate (LIN), ambos a menos de 1h.',
  E'**Clima**: septiembre en la Lombardía suele ser cálido y estable, 20-28°C.\n\n**Ambiente**: si Ferrari pelea por algo, el parque se llena de rojo — llega pronto si quieres buena vista en la Variante del Rettifilo o Parabolica.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-09-04'::date, '12:30 - 13:30 CEST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'monza'
UNION ALL
SELECT id, '2026-09-04'::date, '16:00 - 17:00 CEST', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'monza'
UNION ALL
SELECT id, '2026-09-05'::date, '11:30 - 12:30 CEST', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'monza'
UNION ALL
SELECT id, '2026-09-05'::date, '16:00 - 17:00 CEST', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'monza'
UNION ALL
SELECT id, '2026-09-06'::date, '15:00 CEST', 'Carrera — Gran Premio de Italia', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'monza';

INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order)
SELECT id, 'Gafas de sol polarizadas', 'Las rectas de Monza generan mucho reflejo de sol; unas polarizadas ayudan a seguir los coches a 350 km/h.', 'https://www.amazon.es/s?k=gafas+de+sol+polarizadas+deporte', NULL, 'accesorios', 1 FROM circuits WHERE slug = 'monza'
UNION ALL
SELECT id, 'Radio para escuchar comunicaciones del circuito', 'En Monza el ambiente sonoro es tremendo; una radio con auriculares te permite seguir la retransmisión oficial en pista.', 'https://www.amazon.es/s?k=radio+auriculares+circuito+carreras', NULL, 'audio', 2 FROM circuits WHERE slug = 'monza';

-- =========================================================
-- 5. Madrid — Gran Premio de España (13 septiembre 2026) — nuevo trazado, se migrará desde MadRing
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'madrid',
  'Madring (IFEMA - Circuito Urbano de Madrid)',
  'España',
  'Madrid',
  5.474,
  20,
  NULL,
  '2026-09-13T15:00:00+02:00',
  '2026-09-12T16:00:00+02:00',
  '2026-09-11T12:30:00+02:00',
  '2026-09-11T16:00:00+02:00',
  '2026-09-12T11:30:00+02:00',
  FALSE,
  '{"lat": 40.4636, "lng": -3.5668}',
  'Europe/Madrid',
  'El nuevo trazado semiurbano de Madrid debuta en el calendario como cierre de la temporada europea. Sin récord de vuelta todavía: primera edición.',
  E'**En metro**: la parada de Feria de Madrid (IFEMA) queda en la línea 8, conexión directa con el centro y el aeropuerto.\n\n**En avión**: Madrid-Barajas (MAD) está a 10-15 min del recinto.',
  E'Contenido detallado de este GP se ampliará más adelante — la cobertura completa de Madrid vive hoy en MadRing y se migrará a PaddockData en una fase posterior.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-09-11'::date, '12:30 - 13:30 CEST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'madrid'
UNION ALL
SELECT id, '2026-09-11'::date, '16:00 - 17:00 CEST', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'madrid'
UNION ALL
SELECT id, '2026-09-12'::date, '11:30 - 12:30 CEST', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'madrid'
UNION ALL
SELECT id, '2026-09-12'::date, '16:00 - 17:00 CEST', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'madrid'
UNION ALL
SELECT id, '2026-09-13'::date, '15:00 CEST', 'Carrera — Gran Premio de España (Madrid)', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026. Primera edición en Madrid.' FROM circuits WHERE slug = 'madrid';

-- =========================================================
-- 6. Bakú — Gran Premio de Azerbaiyán (26 septiembre 2026, carrera en sábado)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'baku',
  'Baku City Circuit',
  'Azerbaiyán',
  'Bakú',
  6.003,
  20,
  '1:43.009 — Charles Leclerc (Ferrari, 2019)',
  '2026-09-26T17:00:00+04:00',
  '2026-09-25T18:00:00+04:00',
  '2026-09-24T14:30:00+04:00',
  '2026-09-24T18:00:00+04:00',
  NULL,
  FALSE,
  '{"lat": 40.3725, "lng": 49.8533}',
  'Asia/Baku',
  'Calles estrechas del casco antiguo y la recta más larga del calendario. En 2026 el fin de semana se adelanta un día y la carrera se disputa en sábado por el Día de Conmemoración Nacional de Azerbaiyán.',
  E'**En avión**: aeropuerto internacional Heydar Aliyev (GYD), ~25 min del circuito.\n\n**A pie**: el circuito atraviesa el centro de Bakú; muchas gradas son accesibles caminando desde el casco antiguo.',
  E'**Calendario especial**: fin de semana adelantado (jueves-sábado) para no coincidir con el domingo 27 de septiembre, día de duelo nacional en Azerbaiyán.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-09-24'::date, '14:30 - 15:30 +04', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'baku'
UNION ALL
SELECT id, '2026-09-24'::date, '18:00 - 19:00 +04', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'baku'
UNION ALL
SELECT id, '2026-09-25'::date, '18:00 - 19:00 +04', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'baku'
UNION ALL
SELECT id, '2026-09-26'::date, '17:00 +04', 'Carrera — Gran Premio de Azerbaiyán (sábado)', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026: carrera en sábado por el día de conmemoración nacional del domingo.' FROM circuits WHERE slug = 'baku';

-- =========================================================
-- 7. Singapur — Gran Premio de Singapur (11 octubre 2026) — fin de semana sprint
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'singapur',
  'Marina Bay Street Circuit',
  'Singapur',
  'Singapur',
  4.940,
  19,
  '1:34.486 — Charles Leclerc (Ferrari, 2023)',
  '2026-10-11T20:00:00+08:00',
  '2026-10-09T21:00:00+08:00',
  '2026-10-09T17:30:00+08:00',
  NULL,
  NULL,
  TRUE,
  '{"lat": 1.2914, "lng": 103.8640}',
  'Asia/Singapore',
  'Carrera nocturna urbana entre rascacielos y calor húmedo casi tropical. Último fin de semana sprint del calendario 2026.',
  E'**En metro (MRT)**: Promenade, Esplanade y Bayfront son las paradas más cercanas al circuito.\n\n**En avión**: Changi (SIN), ~25-30 min en metro o taxi.',
  E'**Clima**: calor húmedo constante (28-31°C, humedad muy alta) incluso de noche — hidratación constante.\n\n**Formato sprint**: viernes clasificación (carrera del domingo) y sprint qualifying; sábado la carrera sprint.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-10-09'::date, '17:30 - 18:30 +08', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'singapur'
UNION ALL
SELECT id, '2026-10-09'::date, '21:00 - 22:00 +08', 'Clasificación (parrilla del domingo)', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'singapur'
UNION ALL
SELECT id, '2026-10-10'::date, '17:00 - 17:45 +08', 'Clasificación Sprint', 'F1', 'sprint_qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'singapur'
UNION ALL
SELECT id, '2026-10-10'::date, '21:00 - 21:45 +08', 'Carrera Sprint', 'F1', 'sprint', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'singapur'
UNION ALL
SELECT id, '2026-10-11'::date, '20:00 +08', 'Carrera — Gran Premio de Singapur', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026. Último fin de semana sprint de la temporada.' FROM circuits WHERE slug = 'singapur';

-- =========================================================
-- 8. Austin — Gran Premio de Estados Unidos (25 octubre 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'austin',
  'Circuit of The Americas',
  'Estados Unidos',
  'Austin',
  5.513,
  20,
  '1:36.169 — Charles Leclerc (Ferrari, 2019)',
  '2026-10-25T14:00:00-05:00',
  '2026-10-24T15:00:00-05:00',
  '2026-10-23T12:30:00-05:00',
  '2026-10-23T16:00:00-05:00',
  '2026-10-24T11:00:00-05:00',
  FALSE,
  '{"lat": 30.1328, "lng": -97.6411}',
  'America/Chicago',
  'Subida ciega al Turn 1 inspirada en Eau Rouge, sobre las colinas de Texas.',
  E'**En coche**: COTA está a 15-20 min al sureste del centro de Austin; hay parkings oficiales de pago que se agotan pronto.\n\n**En avión**: aeropuerto de Austin-Bergstrom (AUS), ~20 min.',
  E'**Clima**: finales de octubre en Texas suelen ser suaves (18-27°C) pero con posibilidad de frentes fríos repentinos.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-10-23'::date, '12:30 - 13:30 CDT', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'austin'
UNION ALL
SELECT id, '2026-10-23'::date, '16:00 - 17:00 CDT', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'austin'
UNION ALL
SELECT id, '2026-10-24'::date, '11:00 - 12:00 CDT', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'austin'
UNION ALL
SELECT id, '2026-10-24'::date, '15:00 - 16:00 CDT', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'austin'
UNION ALL
SELECT id, '2026-10-25'::date, '14:00 CDT', 'Carrera — Gran Premio de Estados Unidos', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'austin';

-- =========================================================
-- 9. Ciudad de México — Gran Premio de México (1 noviembre 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'mexico',
  'Autódromo Hermanos Rodríguez',
  'México',
  'Ciudad de México',
  4.304,
  17,
  '1:17.774 — Valtteri Bottas (Mercedes, 2021)',
  '2026-11-01T14:00:00-06:00',
  '2026-10-31T15:00:00-06:00',
  '2026-10-30T12:30:00-06:00',
  '2026-10-30T16:00:00-06:00',
  '2026-10-31T11:00:00-06:00',
  FALSE,
  '{"lat": 19.4042, "lng": -99.0907}',
  'America/Mexico_City',
  'El Foro Sol convierte la última curva en un estadio: uno de los ambientes más ruidosos del calendario, a 2,200 m de altitud.',
  E'**En metro**: línea 9, estación Ciudad Deportiva, a las puertas del autódromo.\n\n**En avión**: aeropuerto de la Ciudad de México (MEX/AIFA), 20-40 min según terminal.',
  E'**Altitud**: 2,200 msnm afecta al rendimiento aerodinámico de los coches y también a los aficionados poco aclimatados — hidratación extra recomendada.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-10-30'::date, '12:30 - 13:30 CST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'mexico'
UNION ALL
SELECT id, '2026-10-30'::date, '16:00 - 17:00 CST', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'mexico'
UNION ALL
SELECT id, '2026-10-31'::date, '11:00 - 12:00 CST', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'mexico'
UNION ALL
SELECT id, '2026-10-31'::date, '15:00 - 16:00 CST', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'mexico'
UNION ALL
SELECT id, '2026-11-01'::date, '14:00 CST', 'Carrera — Gran Premio de México', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'mexico';

-- =========================================================
-- 10. São Paulo (Interlagos) — Gran Premio de Brasil (8 noviembre 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'brasil',
  'Autódromo José Carlos Pace (Interlagos)',
  'Brasil',
  'São Paulo',
  4.309,
  15,
  '1:10.540 — Valtteri Bottas (Mercedes, 2018)',
  '2026-11-08T14:00:00-03:00',
  '2026-11-07T15:00:00-03:00',
  '2026-11-06T12:30:00-03:00',
  '2026-11-06T16:00:00-03:00',
  '2026-11-07T11:00:00-03:00',
  FALSE,
  '{"lat": -23.7036, "lng": -46.6997}',
  'America/Sao_Paulo',
  'Sentido antihorario, altibajos constantes y un público entregado en uno de los circuitos históricos del calendario.',
  E'**En metro**: línea 9 Esmeralda, estación Autódromo (solo días de evento) o Jurubatuba.\n\n**En avión**: Congonhas (CGH, más cercano) o Guarulhos (GRU).',
  E'**Clima**: noviembre es primavera en São Paulo, tiempo variable con posibilidad de chubascos fuertes y repentinos.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-11-06'::date, '12:30 - 13:30 -03', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'brasil'
UNION ALL
SELECT id, '2026-11-06'::date, '16:00 - 17:00 -03', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'brasil'
UNION ALL
SELECT id, '2026-11-07'::date, '11:00 - 12:00 -03', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'brasil'
UNION ALL
SELECT id, '2026-11-07'::date, '15:00 - 16:00 -03', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'brasil'
UNION ALL
SELECT id, '2026-11-08'::date, '14:00 -03', 'Carrera — Gran Premio de Brasil', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'brasil';

-- =========================================================
-- 11. Las Vegas — Gran Premio de Las Vegas (21 noviembre 2026, carrera nocturna en sábado)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'las-vegas',
  'Las Vegas Strip Circuit',
  'Estados Unidos',
  'Las Vegas',
  6.201,
  17,
  '1:35.490 — Oscar Piastri (McLaren, 2023)',
  '2026-11-21T20:00:00-08:00',
  '2026-11-20T20:00:00-08:00',
  '2026-11-19T20:30:00-08:00',
  '2026-11-19T23:59:00-08:00',
  '2026-11-20T20:30:00-08:00',
  FALSE,
  '{"lat": 36.1147, "lng": -115.1728}',
  'America/Los_Angeles',
  'Carrera nocturna por el Strip de Las Vegas, con Bellagio y Sphere de fondo. Sesiones y carrera en horario nocturno local.',
  E'**En coche/rideshare**: el Strip corta el tráfico habitual los días de sesión; los rideshares tienen zonas de recogida específicas señalizadas por la organización.\n\n**En avión**: Harry Reid International (LAS), muy cerca del circuito.',
  E'**Clima**: noches de noviembre en el desierto de Nevada, frío marcado (5-15°C) pese al calor diurno — lleva capas de abrigo.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-11-19'::date, '20:30 - 21:30 PST', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'las-vegas'
UNION ALL
SELECT id, '2026-11-20'::date, '20:30 - 21:30 PST', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'las-vegas'
UNION ALL
SELECT id, '2026-11-20'::date, '20:00 - 21:00 PST', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'las-vegas'
UNION ALL
SELECT id, '2026-11-21'::date, '20:00 PST', 'Carrera — Gran Premio de Las Vegas (sábado noche)', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026: carrera nocturna en sábado.' FROM circuits WHERE slug = 'las-vegas';

-- =========================================================
-- 12. Qatar (Lusail) — Gran Premio de Qatar (29 noviembre 2026)
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'qatar',
  'Lusail International Circuit',
  'Qatar',
  'Lusail',
  5.419,
  16,
  '1:22.384 — Max Verstappen (Red Bull, 2023)',
  '2026-11-29T18:00:00+03:00',
  '2026-11-28T19:00:00+03:00',
  '2026-11-27T16:30:00+03:00',
  '2026-11-27T20:00:00+03:00',
  '2026-11-28T15:30:00+03:00',
  FALSE,
  '{"lat": 25.4900, "lng": 51.4542}',
  'Asia/Qatar',
  'Curvas de alta velocidad encadenadas bajo las luces de Lusail, penúltima cita de la temporada.',
  E'**En coche/bus**: Lusail está a 30-40 min del centro de Doha; hay autobuses lanzadera oficiales desde varias estaciones de metro.\n\n**En avión**: Hamad International Airport (DOH), ~45 min.',
  E'**Clima**: finales de noviembre son agradables en Doha (20-28°C), mucho más suave que en verano.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-11-27'::date, '16:30 - 17:30 +03', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'qatar'
UNION ALL
SELECT id, '2026-11-27'::date, '20:00 - 21:00 +03', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'qatar'
UNION ALL
SELECT id, '2026-11-28'::date, '15:30 - 16:30 +03', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'qatar'
UNION ALL
SELECT id, '2026-11-28'::date, '19:00 - 20:00 +03', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'qatar'
UNION ALL
SELECT id, '2026-11-29'::date, '18:00 +03', 'Carrera — Gran Premio de Qatar', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026.' FROM circuits WHERE slug = 'qatar';

-- =========================================================
-- 13. Abu Dhabi (Yas Marina) — Gran Premio de Abu Dabi (6 diciembre 2026) — cierre de temporada
-- =========================================================
INSERT INTO circuits (
  slug, name, country, city, track_length_km, corners, lap_record,
  race_date, qualifying_date, fp1_date, fp2_date, fp3_date, is_sprint,
  coordinates, timezone, summary, how_to_arrive, local_info
) VALUES (
  'abu-dhabi',
  'Yas Marina Circuit',
  'Emiratos Árabes Unidos',
  'Abu Dabi',
  5.281,
  16,
  '1:26.103 — Max Verstappen (Red Bull, 2021)',
  '2026-12-06T17:00:00+04:00',
  '2026-12-05T18:00:00+04:00',
  '2026-12-04T14:30:00+04:00',
  '2026-12-04T18:00:00+04:00',
  '2026-12-05T15:30:00+04:00',
  FALSE,
  '{"lat": 24.4672, "lng": 54.6031}',
  'Asia/Dubai',
  'Atardecer sobre el puerto de Yas Marina y el hotel W en la última cita del año, que suele decidir el campeonato.',
  E'**En metro/taxi**: Yas Island se conecta con Abu Dabi centro en 20-25 min por carretera; hay parkings y zonas de shuttle señalizadas para el evento.\n\n**En avión**: Abu Dhabi International (AUH), ~20 min de Yas Island; Dubái (DXB) queda a ~1h.',
  E'**Clima**: diciembre es la mejor época del año en Abu Dabi, templado (20-28°C) y sin apenas lluvia.'
);

INSERT INTO events (circuit_id, day, time_label, name, category, type, is_confirmed, details)
SELECT id, '2026-12-04'::date, '14:30 - 15:30 +04', 'Entrenamientos Libres 1', 'F1', 'fp1', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'abu-dhabi'
UNION ALL
SELECT id, '2026-12-04'::date, '18:00 - 19:00 +04', 'Entrenamientos Libres 2', 'F1', 'fp2', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'abu-dhabi'
UNION ALL
SELECT id, '2026-12-05'::date, '15:30 - 16:30 +04', 'Entrenamientos Libres 3', 'F1', 'fp3', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'abu-dhabi'
UNION ALL
SELECT id, '2026-12-05'::date, '18:00 - 19:00 +04', 'Clasificación', 'F1', 'qualifying', FALSE, 'Horario provisional, pendiente de confirmación oficial de la FIA.' FROM circuits WHERE slug = 'abu-dhabi'
UNION ALL
SELECT id, '2026-12-06'::date, '17:00 +04', 'Carrera — Gran Premio de Abu Dabi', 'F1', 'race', TRUE, 'Fecha confirmada por el calendario oficial 2026. Última cita de la temporada.' FROM circuits WHERE slug = 'abu-dhabi';

-- =========================================================
-- Afiliados globales (no ligados a un circuito)
-- =========================================================

-- Canales oficiales: la vía legal recomendada, siempre por delante de la VPN.
-- DAZN tiene los derechos en exclusiva de la F1 en España hasta 2026; F1 TV es
-- el servicio global de la propia Fórmula 1 (multicámara, onboard, repeticiones).
INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order) VALUES
  (NULL, 'F1 TV', 'El servicio oficial de la Fórmula 1: todas las sesiones en directo, cámara onboard y repeticiones bajo demanda allá donde esté disponible.', 'https://f1tv.formula1.com/', NULL, 'oficial', 1),
  (NULL, 'DAZN F1', 'Emisora oficial de la Fórmula 1 en España en exclusiva hasta 2026, con todas las sesiones en directo.', 'https://www.dazn.com/es-ES/sports/f1', NULL, 'oficial', 2);

-- VPN: solo para cuando el canal oficial de tu país no cubre la sesión.
INSERT INTO affiliates (circuit_id, title, description, url, image_url, category, sort_order) VALUES
  (NULL, 'NordVPN', 'Accede a la señal de F1 TV y de tu retransmisora habitual aunque estés fuera de tu país de cobertura.', 'https://nordvpn.com/', NULL, 'vpn', 1),
  (NULL, 'ExpressVPN', 'Alternativa rápida y estable para ver sesiones de Libres, Clasificación y Carrera sin restricciones geográficas.', 'https://www.expressvpn.com/', NULL, 'vpn', 2);
