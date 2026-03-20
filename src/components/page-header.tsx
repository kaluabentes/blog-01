import { BackButton } from "./back-button";

interface Props {
  title: string;
  description?: string;
  backHref?: string;
  backButton?: boolean;
}

export function PageHeader({
  title,
  description,
  backHref,
  backButton,
}: Props) {
  return (
    <div className="mb-10">
      {backButton && <BackButton backHref={backHref} />}
      <h1 className="text-3xl font-semibold  capitalize text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
