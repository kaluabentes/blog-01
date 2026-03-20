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
  const { data: categories } = await supabase
    .from("categories")
    .select("name, slug")
    .order("name");

  return (
    <>
      <Header categories={categories ?? []} />
      {children}
      <Footer categories={categories ?? []} />
    </>
  );
}
