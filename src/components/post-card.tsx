import Image from "next/image";
import Link from "next/link";

import { CategoryBadge } from "./category-badge";

export interface Post {
  id: number;
  title: string | null;
  slug: string | null;
  meta_description: string | null;
  image: string | null;
  category: string | null;
  created_at: string;
}

interface Props {
  post: Post;
  categoryMap?: Record<string, string>;
  priority?: boolean;
}

export function PostCard({ post, categoryMap, priority = false }: Props) {
  if (!post.slug) return null;

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        {post.image && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={post.image}
              alt={post.title ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover rounded-lg"
              priority={priority}
            />
          </div>
        )}
      </Link>

      <div className="flex items-center gap-3 mb-1">
        {post.category && (
          <CategoryBadge
            category={post.category}
            label={categoryMap?.[post.category.toLowerCase()]}
          />
        )}
        <p className="text-sm text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-medium text-foreground group-hover:underline mb-2">
          {post.title}
        </h2>
      </Link>

      {post.meta_description && (
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {post.meta_description}
        </p>
      )}
    </article>
  );
}
