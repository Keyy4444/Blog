"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import { fetchPosts, searchPostsByTitle } from "../../api/postService";
import { BlogPost } from "@/types/posts";
import { createPortal } from "react-dom";
import NewPostModal from "../NewPostModal/NewPostModal";
import Image from "next/image";
import pencil from "../../../public/icons/pencil.svg";
import cn from "classnames";
import spin from "../../../public/icons/spin.svg";
import SearchBar from "../SearchBar/SearchBar";
import useFreezeBackground from "@/hooks/useFreezeBackground";

interface BlogProps {
  initialPosts: BlogPost[];
}

export default function Blog({ initialPosts }: BlogProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");

  // freezes background when modal is open
  useFreezeBackground(showModal);

  // refreshes posts when a new post is submitted
  const fetchPostsData = async () => {
    setIsLoading(true);
    try {
      const postsData = await fetchPosts();
      setPosts(postsData.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setIsLoading(true);
        try {
          const searchResults = await searchPostsByTitle(searchQuery);
          setPosts(searchResults.reverse());
        } catch (error) {
          console.error("Error searching posts:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPosts(initialPosts);
      }
    };

    fetchSearchResults();
  }, [searchQuery, initialPosts]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <div
        className={cn("container gap-8 p-16 2xl:p-12 md:p-8 sm:px-5 sm:py-8", {
          "opacity-30": isLoading,
        })}
      >
        <div className="flex flex-row justify-between gap-6 lg:flex-col-reverse sm:gap-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div
            className="flex flex-row items-center justify-center gap-2 border-[1px] rounded-md px-10 py-1.5 bg-lime-200 transition-all hover:shadow-sm hover:bg-lime-300 hover:cursor-pointer lg:w-fit lg:py-2.5 self-start sm:w-full"
            onClick={() => setShowModal(true)}
          >
            <p>New Post</p>
            <div className="flex relative w-[17px] h-[16px] self-center">
              <Image src={pencil} alt="Pencil icon" fill />
            </div>
          </div>
          {showModal &&
            createPortal(
              <NewPostModal
                onClose={() => handleCloseModal()}
                refreshPosts={fetchPostsData}
              />,
              document.body
            )}
        </div>
        <div className="grid grid-cols-3 gap-4 gap-x-8 gap-y-8 2xl:grid-cols-2 md:grid-cols-1 sm:gap-y-6 relative">
          {posts &&
            posts.map((post: BlogPost) => (
              <ArticleCard key={post._id} data={post} />
            ))}
          {isLoading && (
            <Image
              src={spin}
              alt="Loading"
              width={300}
              height={300}
              className="absolute -translate-x-2/4 left-2/4 top-1/2;"
            />
          )}
        </div>
      </div>
    </section>
  );
}
