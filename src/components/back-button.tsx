"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ backHref }: { backHref?: string }) {
  const router = useRouter();

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });

    if (backHref) {
      router.push(backHref);
    }

    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar
    </button>
  );
}
