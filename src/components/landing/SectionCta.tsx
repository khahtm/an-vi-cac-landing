import { FORM_ANCHOR } from "@/lib/site";

/** Mid-page call to action that sends the reader back to the birth chart form. */
export function SectionCta({
  label = "Lập lá số của bạn",
  note,
  className = "",
  href = FORM_ANCHOR,
}: {
  label?: string;
  note?: string;
  className?: string;
  href?: string;
}) {
  return (
    <div data-reveal="true" className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <a href={href} className="btn-gold focus-gold w-full sm:w-auto sm:min-w-64">
        {label}
      </a>
      {note && <p className="text-sm leading-6 text-muted">{note}</p>}
    </div>
  );
}
