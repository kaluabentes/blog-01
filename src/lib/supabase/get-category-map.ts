import { createClient } from "./server";

export async function getCategoryMap(): Promise<Record<string, string>> {
  const supabase = await createClient();

  const { data } = await supabase.from("categories").select("slug, name");

  return Object.fromEntries(
    (data ?? []).map((c) => [c.slug.toLowerCase(), c.name]),
  );
}
