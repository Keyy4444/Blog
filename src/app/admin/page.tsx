import { fetchPosts } from "@/api/postService";
import AdminBlogTable from "@/components/AdminBlogTable/AdminBlogTable";
import { BlogPost } from "@/types/posts";

export default async function Home() {
  const postsData: BlogPost[] = await fetchPosts();
  const posts = postsData.reverse();

  return (
    <div>
      <AdminBlogTable initialPosts={posts} />
    </div>
  );
}
