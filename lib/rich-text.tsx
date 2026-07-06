import { Fragment } from "react";

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

/** Renderiza texto con saltos de párrafo (\n\n) y **negrita**, sin dangerouslySetInnerHTML. */
export function RichText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mt-3 first:mt-0">
          {renderInline(paragraph, `p${i}`)}
        </p>
      ))}
    </>
  );
}
