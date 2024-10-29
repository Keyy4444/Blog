"use client";
import React, { useState } from "react";
import { BlogPost } from "@/types/posts";
import { deletePost } from "@/api/postService";
import { createPortal } from "react-dom";
import NewPostModal from "../NewPostModal/NewPostModal";

interface AdminBlogTableProps {
  initialPosts: BlogPost[];
}

export default function AdminBlogTable({ initialPosts }: AdminBlogTableProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showModals, setShowModals] = useState({
    updateModal: false,
    deleteStatusModal: "",
  });

  const handleDeletePost = async (post: BlogPost) => {
    try {
      if (post._id) {
        const status = await deletePost(post._id);
        if (status === 200 || status === 204) {
          console.log("Post deleted successfully");
          setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
          setShowModals({
            ...showModals,
            deleteStatusModal: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setShowModals({
        ...showModals,
        deleteStatusModal: "failure",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModals({
      updateModal: false,
      deleteStatusModal: "",
    });
    setSelectedPost(null);
  };

  return (
    <div className="pt-[80px]">
      <div className="container mx-auto my-8 p-4 border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300 text-left">Id</th>
              <th className="p-3 border border-gray-300 text-left">Title</th>
              <th className="p-3 border border-gray-300 text-left">Slug</th>
              <th className="p-3 border border-gray-300 text-left">Date</th>
              <th className="p-3 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300">{post._id}</td>
                <td className="p-3 border border-gray-300">{post.title}</td>
                <td className="p-3 border border-gray-300">{post.slug}</td>
                <td className="p-3 border border-gray-300">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedPost(post); // Set the post to edit
                      setShowModals({ ...showModals, updateModal: true });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="ml-4 text-red-600 hover:underline"
                    onClick={() => handleDeletePost(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModals.updateModal &&
        selectedPost &&
        createPortal(
          <NewPostModal
            onClose={() => handleCloseModal()}
            refreshPosts={handleCloseModal}
            initialPost={selectedPost}
          />,
          document.body
        )}

      {/* Delete Modal */}
      {(showModals.deleteStatusModal === "success" ||
        showModals.deleteStatusModal === "failure") &&
        createPortal(
          <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40"
              onClick={handleCloseModal}
            ></div>
            <div className="h-fit w-1/4 p-8 absolute top-1/3 left-[37.5%] flex flex-col gap-8 items-center text-center bg-white border-[2px] border-orange-800 rounded-md z-50 xl:w-1/2 xl:left-1/4 md:w-3/4 md:left-[12.5%] ">
              <p>
                {showModals.deleteStatusModal === "success"
                  ? "You have successfully deleted this post"
                  : "There was a problem problem processing your request"}
              </p>
              <div>
                <div
                  className="px-5 py-1.5 rounded-md border-black border-[1px] hover:bg-slate-50 md:px-8 md:py-3 lg:w-full"
                  onClick={handleCloseModal}
                >
                  Ok
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
