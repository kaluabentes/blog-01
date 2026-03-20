"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { createClient } from "@/lib/supabase/client";

interface Result {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  category: string | null;
}

interface SearchState {
  results: Result[];
  loading: boolean;
  searched: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  categoryMap: Record<string, string>;
}

const INITIAL_STATE: SearchState = {
  results: [],
  loading: false,
  searched: false,
};

export function SearchDialog({ open, onClose, categoryMap }: Props) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>(INITIAL_STATE);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    let cancelled = false;

    const search = async () => {
      if (!debouncedQuery.trim()) {
        setState(INITIAL_STATE);
        return;
      }

      setState((prev) => ({ ...prev, loading: true }));

      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, image, category")
        .ilike("title", `%${debouncedQuery}%`)
        .limit(8);

      if (!cancelled) {
        setState({ results: data ?? [], loading: false, searched: true });
      }
    };

    search();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setQuery("");
      setState(INITIAL_STATE);
      onClose();
    }
  };

  const { results, loading, searched } = state;
  const isEmpty = searched && results.length === 0 && !loading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 gap-0 overflow-hidden [&>button]:hidden flex flex-col w-screen h-screen max-w-none rounded-none translate-x-0 translate-y-0 top-0 left-0 sm:w-[480px] sm:h-auto  sm:rounded-xl sm:top-24 sm:left-1/2 sm:-translate-x-1/2">
        <DialogTitle className="sr-only">Search posts</DialogTitle>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border shrink-0">
          {loading ? (
            <Loader2 className="w-4 h-4 text-muted-foreground shrink-0 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={() => (query ? setQuery("") : handleOpenChange(false))}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 sm:max-h-[360px]">
          {!query && results.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Type to search posts...
            </p>
          )}

          {isEmpty && results.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((post) => (
                <li
                  key={post.id}
                  className="border-b border-border last:border-0"
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    onClick={() => handleOpenChange(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors"
                  >
                    {post.image ? (
                      <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title ?? ""}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 shrink-0 rounded-md bg-muted" />
                    )}
                    <div className="flex flex-col min-w-0 gap-0.5">
                      {post.category && (
                        <span className="text-xs text-muted-foreground truncate">
                          {categoryMap[post.category.toLowerCase()] ??
                            post.category}
                        </span>
                      )}
                      <span className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                        {post.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
