"use client";
import React, { useState } from "react";
import parse from "html-react-parser";
import { BlogPost } from "@/types/posts";
import { createPortal } from "react-dom";
import { deletePost, fetchPostById } from "@/api/postService";
import NewPostModal from "../NewPostModal/NewPostModal";
import Link from "next/link";
import useFreezeBackground from "@/hooks/useFreezeBackground";

interface PostContentProps {
  initialPost: BlogPost;
}

export default function PostContent({ initialPost }: PostContentProps) {
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [showModals, setShowModals] = useState({
    updateModal: false,
    deleteModal: false,
    deleteSuccessModal: "",
  });

  // freezes background when modal is open
  useFreezeBackground(showModals.updateModal);

  const handleCloseModal = () => {
    setShowModals({
      updateModal: false,
      deleteModal: false,
      deleteSuccessModal: "",
    });
  };

  // refreshes post when it is updated
  const fetchPostData = async () => {
    try {
      if (post._id) {
        const postData = await fetchPostById(post._id);
        setPost(postData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
    }
  };

  const handleDeletePost = async () => {
    try {
      if (post._id) {
        const status = await deletePost(post._id);
        if (status === 200 || status === 204) {
          console.log("Post deleted successfully");
          setShowModals({
            ...showModals,
            deleteModal: false,
            deleteSuccessModal: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setShowModals({
        ...showModals,
        deleteModal: false,
        deleteSuccessModal: "failure",
      });
    }
  };

  return (
    <section className="container px-32 pt-10 lg:px-16 md:px-10">
      <div className="flex flex-row gap-4 justify-between md:flex-col-reverse">
        <div className="w-full border-r-[1px] border-black pr-4 md:border-t-[1px] md:border-r-0 md:pt-8 md:pr-0">
          {parse(post.content)}
        </div>
        <div className="flex flex-col gap-4 md:flex-row ">
          <div
            className="flex flex-row items-center justify-center text-center gap-2 border-[1px] rounded-md px-5 py-1.5 min-w-[180px] bg-lime-200 transition-all hover:shadow-sm hover:bg-lime-300 hover:cursor-pointer lg:w-fit lg:py-2.5 self-start md:w-full md:shrink-1 md:min-w-0"
            onClick={() => setShowModals({ ...showModals, updateModal: true })}
          >
            <p>Update Post</p>
          </div>
          <div
            className="flex flex-row items-center justify-center text-center gap-2 border-[1px] rounded-md px-5 py-1.5 min-w-[180px] bg-red-500 text-white transition-all hover:shadow-sm hover:bg-red-600 hover:cursor-pointer lg:w-fit lg:py-2.5 self-start md:w-full md:shrink-1 md:min-w-0"
            onClick={() => setShowModals({ ...showModals, deleteModal: true })}
          >
            <p>Delete Post</p>
          </div>
        </div>
      </div>

      {/* Update Post Modal */}
      {showModals.updateModal &&
        createPortal(
          <NewPostModal
            onClose={() => handleCloseModal()}
            refreshPosts={fetchPostData}
            initialPost={post}
          />,
          document.body
        )}

      {/* Confirm Deletion Modal */}
      {showModals.deleteModal &&
        createPortal(
          <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40"
              onClick={handleCloseModal}
            ></div>
            <div className="h-fit w-1/4 p-8 absolute top-1/3 left-[37.5%] flex flex-col gap-8 items-center text-center bg-white border-[2px] border-orange-800 rounded-md z-50 2xl:w-1/3 2xl:left-1/3 xl:w-1/2 xl:left-1/4 md:w-3/4 md:left-[12.5%]">
              <p>Are you sure you want to delete this post?</p>
              <div className="flex flex-row gap-8 lg:w-full lg:gap-12 md:gap-4">
                <button
                  className="px-5 py-1.5 text-xl bg-red-500 rounded-md text-white hover:bg-red-600 md:px-8 md:py-4 lg:w-full"
                  onClick={handleDeletePost}
                >
                  Yes
                </button>
                <button
                  className="px-5 py-1.5 text-xl rounded-md border-black border-[1px] hover:bg-slate-50 md:px-8 md:py-4 lg:w-full"
                  onClick={() => handleCloseModal()}
                >
                  No
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Deletion Status Modal */}
      {(showModals.deleteSuccessModal === "success" ||
        showModals.deleteSuccessModal === "failure") &&
        createPortal(
          <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40"
              onClick={handleCloseModal}
            ></div>
            <div className="h-fit w-1/4 p-8 absolute top-1/3 left-[37.5%] flex flex-col gap-8 items-center text-center bg-white border-[2px] border-orange-800 rounded-md z-50 xl:w-1/2 xl:left-1/4 md:w-3/4 md:left-[12.5%] ">
              <p>
                {showModals.deleteSuccessModal === "success"
                  ? "You have successfully deleted this post"
                  : "There was a problem problem processing your request"}
              </p>
              <div>
                <Link
                  href={"/"}
                  className="px-5 py-1.5 rounded-md border-black border-[1px] hover:bg-slate-50 md:px-8 md:py-3 lg:w-full"
                  onClick={handleCloseModal}
                >
                  Ok
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
