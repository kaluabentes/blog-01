"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ backHref }: { backHref?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => (backHref ? router.push(backHref) : router.back())}
      className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar
    </button>
  );
}
