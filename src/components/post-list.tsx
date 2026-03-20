import { type Post, PostCard } from "./post-card";

interface Props {
  posts: Post[];
  categoryMap?: Record<string, string>;
}

export function PostList({ posts, categoryMap }: Props) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">No posts found.</p>;
  }

  const [first, ...rest] = posts;

  return (
    <div className="flex flex-col gap-8">
      {/* First post — full width */}
      <PostCard
        post={first}
        categoryMap={categoryMap}
        priority={true}
        featured
      />

      {/* Remaining posts — 2 columns on desktop */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <PostCard key={post.id} post={post} categoryMap={categoryMap} />
          ))}
        </div>
      )}
    </div>
  );
}
