import User from "../models/user";

export const create = async (payload): Promise<object> => {
  return await User.create(payload);
};

export const find = async (id: number): Promise<object | null> => {
  return await User.findOne({
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

export const remove = async (id: number): Promise<number> => {
  return await User.destroy({
    where: { id },
  });
};
export function findOne(arg0: { where: { email: string } }) {
  throw new Error("Function not implemented.");
}
