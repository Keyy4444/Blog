import { fetchAllPosts } from "@/api/postService";
import AdminBlogTable from "@/components/AdminBlogTable/AdminBlogTable";
import { BlogPost } from "@/types/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for blog",
  alternates: {
    canonical: `https://keyfourblog.com/admin/`,
  },
};

export default async function Home() {
  const postsData: BlogPost[] = await fetchAllPosts();
  const posts = postsData;

  return (
    <div>
      <AdminBlogTable initialPosts={posts} />
    </div>
  );
}
