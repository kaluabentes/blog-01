"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

interface Category {
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

export function Header({ categories }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (slug: string) => pathname === `/category/${slug}`;

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link href="/" className="font-bold text-xl tracking-tight shrink-0">
          BLOG
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition-opacity ${
              pathname === "/"
                ? "opacity-100 underline underline-offset-4"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`transition-opacity ${
                isActive(cat.slug)
                  ? "opacity-100 underline underline-offset-4"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <button className="hover:opacity-70 transition-opacity">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary-foreground/20">
          <nav className="flex flex-col px-4 py-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between py-4 border-b border-primary-foreground/10 text-sm font-medium transition-opacity ${
                pathname === "/"
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              Home
              <span className="opacity-50">›</span>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between py-4 border-b border-primary-foreground/10 text-sm font-medium transition-opacity ${
                  isActive(cat.slug)
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {cat.name}
                <span className="opacity-50">›</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
