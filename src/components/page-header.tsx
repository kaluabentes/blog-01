import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export function PageHeader({
  title,
  description,
  backHref,
  backLabel = "Voltar",
}: Props) {
  return (
    <div className="mb-10">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold  transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      )}
      <h1 className="text-3xl font-semibold mt-4 capitalize text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
