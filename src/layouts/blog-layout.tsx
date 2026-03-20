import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const [{ data: categories }, { data: pages }] = await Promise.all([
    supabase.from("categories").select("name, slug").order("name"),
    supabase.from("pages").select("title, slug").order("title"),
  ]);

  const categoryMap = Object.fromEntries(
    (categories ?? []).map((c) => [c.slug.toLowerCase(), c.name]),
  );

  return (
    <>
      <Header categories={categories ?? []} categoryMap={categoryMap} />
      <main className="max-w-4xl mx-auto px-4 py-12 w-full">{children}</main>
      <Footer categories={categories ?? []} pages={pages ?? []} />
    </>
  );
}
