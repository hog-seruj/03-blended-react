import axios from "axios";
import type { Post } from '../types/post';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText:string, page:number) =>
{
  const response = await axios.get<Post[]>('/posts', {
    params: {
      q: searchText,
      _page: page,
      _limit: 8
    }
  });
  return {
    posts: response.data,
    totalPages: Math.ceil(response.headers['x-total-count'] / 8)
  };
};

export const createPost = async (newPost) => {};

export const editPost = async (post: Post): Promise<Post> => {
  const response = await axios.patch<Post>(`/posts/${post.id}`, post);
  return response.data;
};

export const deletePost = async (postId) => {};
