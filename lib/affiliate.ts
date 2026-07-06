/**
 * El Amazon Associates ID real vive solo en la variable de entorno
 * AMAZON_ASSOCIATES_TAG (.env.local / Vercel), nunca en el repo ni en
 * db/seed.sql, para que nadie pueda copiarlo desde el código fuente.
 */
export function withAmazonTag(url: string): string {
  const tag = process.env.AMAZON_ASSOCIATES_TAG;
  if (!tag) return url;

  try {
    const parsed = new URL(url);
    if (!/(^|\.)amazon\.[a-z.]+$/i.test(parsed.hostname)) return url;
    parsed.searchParams.set("tag", tag);
    return parsed.toString();
  } catch {
    return url;
  }
}
