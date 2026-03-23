import { PostPagination } from "@/components/pagination";
import { PostList } from "@/components/post-list";
import { getCategoryMap } from "@/lib/supabase/get-category-map";
import { createClient } from "@/lib/supabase/server";

const PER_PAGE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const from = (currentPage - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  const supabase = await createClient();

  const [{ data: posts, count, error }, categoryMap] = await Promise.all([
    supabase
      .from("posts")
      .select(
        "id, title, slug, meta_description, image, category, created_at",
        {
          count: "exact",
        },
      )
      .order("created_at", { ascending: false })
      .range(from, to),
    getCategoryMap(),
  ]);

  if (error) throw new Error(error.message);

  return (
    <>
      <PostList posts={posts ?? []} categoryMap={categoryMap} featured />
      <PostPagination
        currentPage={currentPage}
        totalPages={Math.ceil((count ?? 0) / PER_PAGE)}
        basePath="/"
      />
    </>
  );
}
