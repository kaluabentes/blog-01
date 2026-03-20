import { Post } from "@/models/Post";

import { PostCard } from "./post-card";

interface Props {
  posts: Post[];
  categoryMap?: Record<string, string>;
  featured?: boolean;
}

export function PostList({ posts, categoryMap, featured = false }: Props) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">No posts found.</p>;
  }

  if (!featured) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            categoryMap={categoryMap}
            priority={index === 0}
          />
        ))}
      </div>
    );
  }

  const [first, ...rest] = posts;

  return (
    <div className="flex flex-col gap-8">
      <PostCard
        post={first}
        categoryMap={categoryMap}
        priority={true}
        featured
      />

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
