import Image from "next/image";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/category-badge";
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

  const formattedDate = new Date(post.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-6">
        {post.category && (
          <CategoryBadge
            category={post.category}
            label={categoryMap[post.category.toLowerCase()]}
            className="mb-3 block"
          />
        )}

        <h1 className="text-3xl font-bold leading-tight mb-4 text-foreground">
          {post.title}
        </h1>

        {post.meta_description && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
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
        <div className="relative w-full h-72 mb-8">
          <Image
            src={post.image}
            alt={post.title ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <article
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </main>
  );
}
