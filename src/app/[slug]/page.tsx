import { fetchAllPosts, fetchPostBySlug } from "@/api/postService";
import React from "react";
import { BlogPost } from "@/types/posts";
import { notFound } from "next/navigation";
import HeroSection from "@/components/HeroSection/HeroSection";
import PostContent from "@/components/PostContent/PostContent";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;
interface PageProps {
  params: Params;
}

export async function generateStaticParams() {
  const posts: BlogPost[] = await fetchAllPosts();

  return posts.map((post) => (post.slug ? { slug: post.slug } : null));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const post = await fetchPostBySlug(slug);

    if (!post) {
      return notFound();
    }

    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `https://keyfourblog.com/${slug}/`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error fetching metadata for post:", error);
    return notFound();
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

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

export const revalidate = 60;
