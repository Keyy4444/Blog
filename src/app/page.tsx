import { fetchPosts } from "@/api/postService";
import Blog from "@/components/Blog/Blog";
import HeroSection from "@/components/HeroSection/HeroSection";
import { BlogPost } from "@/types/posts";

export default async function Home() {
  const postsData: BlogPost[] = await fetchPosts();
  const posts = postsData.reverse();

  return (
    <div>
      <HeroSection
        title="This is my blog"
        description="Some great and not so great articles"
      />
      <Blog initialPosts={posts} />
    </div>
  );
}
