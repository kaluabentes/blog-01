import { PageHeader } from "@/components/page-header";
import { PostPagination } from "@/components/pagination";
import { PostList } from "@/components/post-list";
import { CATEGORY_TAGLINE, NAME } from "@/config/general";
import { getCategoryMap } from "@/lib/supabase/get-category-map";
import { createClient } from "@/lib/supabase/server";

const PER_PAGE = 12;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categoryMap = await getCategoryMap();
  const name = categoryMap[slug] ?? slug;

  return { title: `${name} - ${CATEGORY_TAGLINE} | ${NAME}` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
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
      .eq("category", slug)
      .order("created_at", { ascending: false })
      .range(from, to),
    getCategoryMap(),
  ]);

  if (error) throw new Error(error.message);

  const categoryName = categoryMap[slug] ?? slug;

  return (
    <>
      <PageHeader
        title={categoryName}
        description={`${count} ${count === 1 ? "post" : "posts"}`}
        backHref="/"
        backButton
      />
      <PostList posts={posts ?? []} categoryMap={categoryMap} featured />
      <PostPagination
        currentPage={currentPage}
        totalPages={Math.ceil((count ?? 0) / PER_PAGE)}
        basePath="/"
      />
    </>
  );
}
