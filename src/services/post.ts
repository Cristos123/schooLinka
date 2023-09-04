import * as Post from "../repositories/post";
import ExceptionError from "../libs/exceptions";
import { ErrorResponse } from "../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
export const createPost = async (
  payload: object
): Promise<object | ErrorResponse> => {
  const newPost = await Post.createPost(payload);

  return newPost;
};

export const findSinlePost = async (
  id: number
): Promise<object | ErrorResponse> => {
  const post = await Post.find(id);
  if (!post || post === null)
    return exceptions.NotFoundError("post does not exist");

  return post;
};

export const findAllPosts = async (query?: {
  offset: number;
  limit: number;
}): Promise<{ rows: object[]; count: number }> => {
  const posts = await Post.findAll(query);

  return posts;
};

export const updatePost = async (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
): Promise<string | object | ErrorResponse> => {
  const updatedUser = await Post.update(id, payload);

  return updatedUser;
};

export const deletePost = async (
  id: number
): Promise<number | ErrorResponse> => {
  return await Post.remove(id);
};
