import { fetchAllPosts } from "@/api/postService";
import AdminBlogTable from "@/components/AdminBlogTable/AdminBlogTable";
import { BlogPost } from "@/types/posts";

export default async function Home() {
  const postsData: BlogPost[] = await fetchAllPosts();
  const posts = postsData;

  return (
    <div>
      <AdminBlogTable initialPosts={posts} />
    </div>
  );
}
