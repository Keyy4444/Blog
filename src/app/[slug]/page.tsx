import { fetchPostBySlug, fetchPosts } from "@/api/postService";
import React from "react";
import { BlogPost } from "@/types/posts";
import { notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection/HeroSection";
import PostContent from "@/components/PostContent/PostContent";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts: BlogPost[] = await fetchPosts();

  return posts
    .map((post) => (post.slug ? { slug: post.slug } : null))
    .filter((param): param is { slug: string } => param !== null);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post: BlogPost = await fetchPostBySlug(slug);
    return (
      <div>
        <HeroSection
          title={post.title}
          description={post.description}
          img={post.bannerImage}
        />
        <PostContent initialPost={post} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}

// export const revalidate = 60;
