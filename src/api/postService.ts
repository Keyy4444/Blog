import { BlogPost } from "@/types/posts";
import axiosInstance from "./axiosConfig";

export const fetchPaginatedPosts = async (
  page: number = 1,
  limit: number = 9
) => {
  const response = await axiosInstance.get(
    `/posts/pagination?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const fetchAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const searchPostsByTitle = async (
  title: string,
  page: number = 1,
  limit: number = 9
) => {
  const response = await axiosInstance.get("/posts/search", {
    params: { title, page, limit },
  });
  return response.data;
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await axiosInstance.get(`/posts/slug/${slug}`);
  return response.data;
};

export const fetchPostById = async (id: string): Promise<BlogPost> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: BlogPost) => {
  const response = await axiosInstance.post("/posts", post);
  return response.data;
};

export const updatePost = async (id: string, post: BlogPost) => {
  const response = await axiosInstance.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string): Promise<number> => {
  const response = await axiosInstance.delete(`/posts/${id}`);
  return response.status;
};
