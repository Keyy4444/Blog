import { BlogPost } from "@/types/posts";
import { createPost, updatePost } from "@/api/postService";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import dynamic from "next/dynamic";

const QuillEditor = dynamic(
  () => import("@/components/QuillEditor/QuillEditor"),
  {
    ssr: false,
  }
);

interface NewPostModalProps {
  onClose: () => void;
  refreshPosts?: (page: number) => Promise<void>;
  initialPost?: BlogPost;
}

export default function NewPostModal({
  onClose,
  refreshPosts,
  initialPost,
}: NewPostModalProps) {
  const [data, setData] = useState<
    Omit<BlogPost, "content" | "_id" | "createdAt">
  >({
    title: initialPost?.title || "",
    description: initialPost?.description || "",
    bannerImage: initialPost?.bannerImage || "",
  });

  const [content, setContent] = useState<string>(initialPost?.content || "");
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = { ...data, content };
      if (initialPost && initialPost._id) {
        // If updating an existing post
        await updatePost(initialPost._id, postData);
        console.log("Post updated successfully");
      } else {
        // If creating a new post
        await createPost(postData);
        console.log("Post created successfully");
      }
      if (refreshPosts) {
        refreshPosts(1);
      }
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 409) {
        setError("A post with this title already exists.");
      } else {
        console.error("Error creating post:", error);
      }
    }
  };

  useEffect(() => {
    console.log({ ...data, content });
  }, [data, content]);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 h-full w-full bg-black opacity-30 z-40"
        onClick={onClose}
      ></div>

      <div className="h-fit max-h-[90vh] w-3/4 fixed top-12 left-[12.5%] bg-white border-[2px] border-orange-800 rounded-md z-50 overflow-y-auto md:w-[90%] md:left-[5%]">
        <div className="p-10 flex flex-col gap-2 items-center overflow-y-auto">
          <div>{initialPost ? "Update Post" : "Create a New Post"}</div>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-col mb-4">
              <div className="flex flex-col gap-2">
                <label className="mb-2 font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  maxLength={64}
                  value={data.title}
                  onChange={handleInputChange}
                  className="border-2 p-2 rounded-md"
                  required
                />
                {error === "A post with this title already exists." && (
                  <span className="text-xs text-red-500">
                    A post with this title already exists *
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold">Description</label>
              <input
                type="text"
                name="description"
                maxLength={300}
                value={data.description}
                onChange={handleInputChange}
                className="border-2 p-2 rounded-md"
                required
              />
            </div>
            <QuillEditor value={content} onChange={handleContentChange} />
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold">Banner Image URL</label>
              <input
                type="text"
                name="bannerImage"
                maxLength={256}
                value={data.bannerImage}
                onChange={handleInputChange}
                className="border-2 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => onClose()}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {initialPost ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
