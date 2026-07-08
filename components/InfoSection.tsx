import type { LucideIcon } from "lucide-react";
import { RichText } from "@/lib/rich-text";

export function InfoSection({
  id,
  icon: Icon,
  title,
  content,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-6 sm:px-6">
      <div className="rounded-[10px] border border-border bg-bg-elevated p-6 sm:p-7">
        <h2 className="font-heading flex items-center gap-2 text-xl font-black uppercase tracking-wide text-text">
          <Icon className="h-5 w-5 text-red" />
          {title}
        </h2>
        <div className="mt-3 max-w-3xl text-sm text-text-muted [&_strong]:text-text">
          <RichText text={content} />
        </div>
      </div>
    </section>
  );
}
