import { type Post, PostCard } from "./post-card";

interface Props {
  posts: Post[];
  categoryMap?: Record<string, string>;
}

export function PostList({ posts, categoryMap }: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nenhum post encontrado.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post, index) => (
        <li key={post.id}>
          <PostCard
            post={post}
            categoryMap={categoryMap}
            priority={index === 0}
          />
        </li>
      ))}
    </ul>
  );
}
