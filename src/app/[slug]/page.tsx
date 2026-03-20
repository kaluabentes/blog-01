import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/markdown-content";
import { PageHeader } from "@/components/page-header";
import BlogLayout from "@/layouts/blog-layout";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("pages")
    .select("title, meta_description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!page) return {};

  return {
    title: page.title,
    description: page.meta_description,
  };
}

export default async function InstitutionalPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", slug)
    .single();

  if (!page || error) notFound();

  return (
    <BlogLayout>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <PageHeader title={page.title} backButton />
        <MarkdownContent content={page.content} />
      </main>
    </BlogLayout>
  );
}
