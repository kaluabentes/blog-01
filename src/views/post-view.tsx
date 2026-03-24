"use client";

import Image from "next/image";

import { BackButton } from "@/components/back-button";
import { CategoryBadge } from "@/components/category-badge";
import { MarkdownContent } from "@/components/markdown-content";
import { PostCard } from "@/components/post-card";
import { ShareButton } from "@/components/share-button";
import { cloudinaryLoader } from "@/lib/cloudinary/cloudinaryLoader";
import { Post } from "@/models/post";

interface Props {
  post: Post;
  relatedPosts: Post[];
  postUrl: string;
  categoryMap: Record<string, string>;
}

export function PostView({ post, relatedPosts, categoryMap, postUrl }: Props) {
  const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <BackButton />

      <header className="mb-6">
        {post.category && (
          <CategoryBadge
            category={post.category}
            label={categoryMap[post.category.toLowerCase()]}
            className="mb-3 block"
          />
        )}

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 text-foreground">
          {post.title}
        </h1>

        {post.meta_description && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
            {post.meta_description}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Editorial Staff</span>
            <span className="mx-1">·</span>
            <time dateTime={post.created_at}>{formattedDate}</time>
          </div>
          <ShareButton title={post.title ?? ""} url={postUrl} />
        </div>
      </header>

      {post.image && (
        <div className="relative w-full h-52 sm:h-72 mb-8">
          <Image
            loader={cloudinaryLoader}
            src={`${post.slug}.jpg`}
            alt={post.title ?? ""}
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover rounded-xl"
            priority
            quality={80}
          />
        </div>
      )}

      <MarkdownContent content={post.content ?? ""} />

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Related posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <PostCard
                key={related.id}
                post={related}
                categoryMap={categoryMap}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
