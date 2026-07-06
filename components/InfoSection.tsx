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
    <section id={id} className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="rounded-xl border border-border bg-bg-card p-6 sm:p-8">
        <h2 className="font-heading flex items-center gap-2 text-3xl font-semibold">
          <Icon className="h-6 w-6 text-red" />
          {title}
        </h2>
        <div className="mt-4 max-w-3xl text-text-muted [&_strong]:text-text">
          <RichText text={content} />
        </div>
      </div>
    </section>
  );
}
