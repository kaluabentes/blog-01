import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getCategoryMap } from "@/lib/supabase/get-category-map";
import { createClient } from "@/lib/supabase/server";
import { PostView } from "@/views/post-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, title_discover, meta_description, image")
    .eq("slug", slug)
    .single();

  if (!post) return {};

  return {
    title: post.title,
    description: post.meta_description,
    openGraph: {
      title: post.title_discover ?? post.title,
      description: post.meta_description ?? "",
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title_discover ?? post.title,
      description: post.meta_description ?? "",
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const protocol = host.includes("localhost") ? "http" : "https";
  const postUrl = `${protocol}://${host}/posts/${slug}`;

  const [{ data: post, error }, categoryMap] = await Promise.all([
    supabase
      .from("posts")
      .select("title, content, image, category, created_at, meta_description")
      .eq("slug", slug)
      .single(),
    getCategoryMap(),
  ]);

  if (!post || error) notFound();

  // Busca posts relacionados da mesma categoria
  const { data: relatedPosts } = await supabase
    .from("posts")
    .select("id, title, slug, meta_description, image, category, created_at")
    .eq("category", post.category)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <PostView
      post={post}
      relatedPosts={relatedPosts ?? []}
      categoryMap={categoryMap}
      postUrl={postUrl}
    />
  );
}
