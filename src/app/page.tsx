import { fetchPaginatedPosts } from "@/api/postService";
import Blog from "@/components/Blog/Blog";
import HeroSection from "@/components/HeroSection/HeroSection";
import { BlogPost } from "@/types/posts";
import { Metadata } from "next";

type ApiResponse = {
  posts: BlogPost[];
  totalPages: number;
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Some great and not so great articles",
  alternates: {
    canonical: `https://keyfourblog.com/`,
  },
};

export default async function Home() {
  const postsData: ApiResponse = await fetchPaginatedPosts(1, 9);
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
