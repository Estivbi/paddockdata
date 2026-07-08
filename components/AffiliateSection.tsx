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
    <section id="recomendados" className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-black uppercase tracking-wide text-text">
          {title}
        </h2>
        <span className="text-[11px] text-text-muted">Enlaces de afiliado</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {affiliates.map((affiliate, i) => {
          const Icon = CATEGORY_ICON[affiliate.category] ?? Tag;
          return (
            <a
              key={affiliate.id}
              href={withAmazonTag(affiliate.url)}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group flex flex-col rounded-[10px] border border-border bg-bg-elevated p-4 transition hover:border-red/60"
            >
              <div className="flex items-start justify-between">
                <span className="ghost-num text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="h-5 w-5 text-red" />
              </div>
              <h3 className="font-heading mt-2 text-base font-bold uppercase leading-snug text-text">
                {affiliate.title}
              </h3>
              {affiliate.description && (
                <p className="mt-1 flex-1 text-xs text-text-muted">
                  {affiliate.description}
                </p>
              )}
              <span className="mt-3 text-xs font-semibold text-red group-hover:underline">
                Ver en Amazon →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
