export interface Post {
  id?: number;
  title: string | null;
  slug?: string | null;
  content?: string;
  meta_description: string | null;
  image: string | null;
  category: string | null;
  created_at: string;
}
