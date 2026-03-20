import Link from "next/link";
import { Leaf } from "lucide-react";

import { NAME } from "@/config/general";

interface Props {
  className?: string;
}

export function Logo({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-1.5 font-bold text-xl tracking-tight shrink-0 ${className}`}
    >
      <Leaf className="w-5 h-5 text-green-500" />
      {NAME}
    </Link>
  );
}
