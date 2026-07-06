import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Esto habla HTTP con el proxy de Neon, no el protocolo de wire de Postgres:
// solo funciona contra un endpoint *.neon.tech real. Un Postgres local o de
// otro proveedor da "fetch failed" aunque DATABASE_URL sea válida.

// Generics fijados a mano: ReturnType<typeof neon> sin ellos infiere un tipo
// unión que TS no deja indexar (rows[0] da error). Queremos siempre filas
// como objetos (arrayMode false) y el array plano de filas (fullResults false).
let cached: NeonQueryFunction<false, false> | null = null;

export function sql(): NeonQueryFunction<false, false> {
  if (!cached) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL no está definida. Configura la cadena de conexión de Neon en tu .env.local o en las variables de entorno de Vercel."
      );
    }
    cached = neon<false, false>(connectionString);
  }
  return cached;
}
