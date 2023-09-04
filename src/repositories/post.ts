import User from "../models/user";
import Post from "../models/post";

export const create = async (payload): Promise<object> => {
  return await User.create(payload);
};

export const find = async (id: number): Promise<object | null> => {
  return await Post.findOne({
    where: { id },
    attributes: {
      exclude: ["updatedAt", "createdAt"],
    },
  });
};

export const findByEmail = async (email: string): Promise<object | null> => {
  return await User.findOne({
    where: { email },
  });
};

export const findAll = async (
  query?: object
): Promise<{ rows: object[]; count: number }> => {
  return await Post.findAndCountAll(query);
};

export const updatePost = async (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
): Promise<string | object> => {
  return await Post.update(payload, {
    where: { id },
    returning: true,
  });
};

export const remove = async (id: number): Promise<number> => {
  return await Post.destroy({
    where: { id },
  });
};

export const createPost = async (payload): Promise<object> => {
  return await Post.create(payload);
};
export const findById = async (id: number): Promise<object | null> => {
  return await Post.findOne({
    where: { id },
    attributes: {
      exclude: ["updatedAt", "createdAt"],
    },
  });
};

export const update = async (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
): Promise<string | object> => {
  return await Post.update(payload, {
    where: { id },
    returning: true,
  });
};
