import * as User from "../repositories/user";
import ExceptionError from "../libs/exceptions";
import { ErrorResponse } from "../interfaces/error";
import { getToken } from "../utils/helpers";
import bcrypt from "bcrypt";
import { UserType } from "src/type/UserType";

const exceptions: ExceptionError = new ExceptionError();
export const createUser = async (
  email: string,
  payload: object
): Promise<object | ErrorResponse> => {
  const user = await User.findByEmail(email);
  if (user)
    return exceptions.UnauthorizedError("User with email already exists");

  const newUser = await User.create(payload);

  return newUser;
};
export const loginUser = async (
  email: string,
  password: string
): Promise<UserType | ErrorResponse> => {
  const user: UserType | null = await User.findByEmail(email);

  if (!user) return exceptions.UnauthorizedError("User not found");

  if (!!(await bcrypt.compare(password, user.password))) {
    const token = getToken(user, exceptions);
    return { ...user, token } as UserType;
  } else {
    return exceptions.UnauthorizedError("Password incorrect");
  }
};
