import {
  Cpu,
  Headphones,
  Package,
  ShoppingBag,
  Tag,
  Tent,
  type LucideIcon,
} from "lucide-react";
import type { Affiliate } from "@/lib/types";
import { withAmazonTag } from "@/lib/affiliate";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  ropa: ShoppingBag,
  audio: Headphones,
  accesorios: Package,
  camping: Tent,
  electronica: Cpu,
  otro: Tag,
};

export function AffiliateSection({
  title,
  affiliates,
}: {
  title: string;
  affiliates: Affiliate[];
}) {
  if (affiliates.length === 0) return null;

  return (
    <section id="recomendados" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-3xl font-semibold">{title}</h2>
        <span className="text-xs text-text-muted">Enlaces de afiliado</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {affiliates.map((affiliate) => {
          const Icon = CATEGORY_ICON[affiliate.category] ?? Tag;
          return (
            <a
              key={affiliate.id}
              href={withAmazonTag(affiliate.amazon_url)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group flex flex-col rounded-xl border border-border bg-bg-card p-5 transition hover:border-red/60"
            >
              <Icon className="h-6 w-6 text-red" />
              <h3 className="font-heading mt-3 text-lg font-semibold leading-snug">
                {affiliate.title}
              </h3>
              {affiliate.description && (
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  {affiliate.description}
                </p>
              )}
              <span className="mt-4 text-sm font-semibold text-red group-hover:underline">
                Ver en Amazon →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
