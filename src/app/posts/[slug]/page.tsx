import Image from "next/image";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/category-badge";
import { MarkdownContent } from "@/components/markdown-content";
import { getCategoryMap } from "@/lib/supabase/getCategoryMap";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, meta_description")
    .eq("slug", slug)
    .single();

  if (!post) return {};
  return { title: post.title, description: post.meta_description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: post, error }, categoryMap] = await Promise.all([
    supabase
      .from("posts")
      .select("title, content, image, category, created_at, meta_description")
      .eq("slug", slug)
      .single(),
    getCategoryMap(),
  ]);

  if (!post || error) notFound();

  const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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

        <div className="flex items-center gap-1 text-sm text-muted-foreground border-t border-border pt-4">
          <span className="font-medium text-foreground">Editorial Staff</span>
          <span className="mx-1">·</span>
          <time dateTime={post.created_at}>{formattedDate}</time>
        </div>
      </header>

      {post.image && (
        <div className="relative w-full h-52 sm:h-72 mb-8">
          <Image
            src={post.image}
            alt={post.title ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, 672px"
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <MarkdownContent content={post.content ?? ""} />
    </main>
  );
}
