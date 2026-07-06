import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

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
