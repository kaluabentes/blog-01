"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

interface Props {
  title: string;
  url: string;
}

export function ShareButton({ title, url }: Props) {
  const [unsupported, setUnsupported] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setUnsupported(true);
      setTimeout(() => setUnsupported(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
      aria-label="Share post"
    >
      {unsupported ? (
        <span className="text-xs font-medium text-primary">Link copied!</span>
      ) : (
        <Share2 size={16} />
      )}
    </button>
  );
}
