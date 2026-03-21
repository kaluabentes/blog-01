"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Post } from "@/models/post";

interface Props {
  post: Post;
  categoryMap?: Record<string, string>;
  priority?: boolean;
  featured?: boolean;
}

export function PostCard({
  post,
  categoryMap,
  priority = false,
  featured = false,
}: Props) {
  const router = useRouter();

  if (!post.slug) return null;

  const categoryLabel = post.category
    ? (categoryMap?.[post.category.toLowerCase()] ?? post.category)
    : null;

  const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (featured) {
    return (
      <article className="group">
        <Link
          href={`/posts/${post.slug}`}
          className="relative block w-full h-72 md:h-[480px] rounded-xl overflow-hidden"
        >
          {/* Image */}
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title ?? ""}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category */}
          {post.category && categoryLabel && (
            <span
              onClick={(e) => {
                e.preventDefault();
                router.push(`/category/${post.category}`);
              }}
              className="absolute top-4 left-4 text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-primary text-primary-foreground cursor-pointer hover:opacity-80 transition-opacity"
            >
              {categoryLabel}
            </span>
          )}

          {/* Content over gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h2 className="text-xl md:text-3xl font-bold text-white leading-snug mb-2">
              {post.title}
            </h2>
            {post.meta_description && (
              <p className="text-sm text-white/70 line-clamp-2 mb-3 hidden md:block">
                {post.meta_description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="text-white/80 font-medium">Read article ›</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block relative w-full h-48 rounded-lg overflow-hidden mb-3"
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 896px) 50vw, 448px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}

        {post.category && categoryLabel && (
          <span
            onClick={(e) => {
              e.preventDefault();
              router.push(`/category/${post.category}`);
            }}
            className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-primary text-primary-foreground cursor-pointer hover:opacity-80 transition-opacity"
          >
            {categoryLabel}
          </span>
        )}
      </Link>

      <p className="text-xs text-muted-foreground mb-1">{formattedDate}</p>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-sm font-semibold text-foreground leading-snug">
          {post.title}
        </h2>
      </Link>
    </article>
  );
}
