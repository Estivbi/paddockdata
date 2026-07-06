import { DatabaseZap } from "lucide-react";

export function DatabaseSetupNotice({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <DatabaseZap className="h-10 w-10 text-red" />
      <h1 className="font-heading text-3xl font-semibold">
        Falta configurar la base de datos
      </h1>
      <p className="text-text-muted">
        PaddockData necesita una conexión a Neon (PostgreSQL) para mostrar los
        circuitos. Define <code className="text-text">DATABASE_URL</code> en{" "}
        <code className="text-text">.env.local</code> (o en las variables de
        entorno de Vercel) y aplica <code className="text-text">db/schema.sql</code>{" "}
        y <code className="text-text">db/seed.sql</code> sobre tu instancia de
        Neon.
      </p>
      <pre className="w-full overflow-x-auto rounded-lg border border-border bg-bg-card p-4 text-left text-xs text-text-muted">
        {message}
      </pre>
    </div>
  );
}
