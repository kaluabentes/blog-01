import Link from "next/link";

interface Props {
  category: string;
  label?: string;
  className?: string;
}

export function CategoryBadge({ category, label, className = "" }: Props) {
  return (
    <Link
      href={`/category/${category}`}
      className={`text-xs font-medium text-primary hover:underline ${className}`}
    >
      {label ?? category}
    </Link>
  );
}
