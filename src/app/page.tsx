import { fetchPosts } from "@/api/postService";
import Blog from "@/components/Blog/Blog";
import HeroSection from "@/components/HeroSection/HeroSection";
import { BlogPost } from "@/types/posts";

type ApiResponse = {
  posts: BlogPost[];
  totalPages: number;
};

export default async function Home() {
  const postsData: ApiResponse = await fetchPosts(1, 9);
  const posts = postsData.posts;

  return (
    <div>
      <HeroSection
        title="This is my blog"
        description="Some great and not so great articles"
      />
      <Blog initialPosts={posts} totalPages={postsData.totalPages} />
    </div>
  );
}
