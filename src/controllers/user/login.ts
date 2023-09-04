import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as User from "../../services/user";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";
import { UserType } from "src/type/UserType";

const exceptions: ExceptionError = new ExceptionError();

type UserError = {
  code?: string;
  message?: string;
  // Add other properties if necessary
};
const loginUser = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const { email, password } = req.body;
    const message = Lib.validator.validateUser(["email", "password"], req.body);
    if (message) {
      return Lib.jsonResponse(res, {
        statusCode: 400,
        data: {
          message,
        },
      });
    }

    const payload = {
      email,
      password,
    };

    const user = await User.loginUser(payload.email, payload.password);
    console.log({ user });

    if (user.code && user.message) {
      // This means it's an error object
      console.error("Login failed:", user.message);

      return Lib.jsonResponse(res, {
        statusCode: user.code,
        data: user.message,
      });
    }
    console.log({ user });
    return Lib.jsonResponse(res, {
      statusCode: 201,
      data: { message: "Login successful", token: (user as UserType)?.token },
    });
  } catch (error) {
    console.log("error", error);

    return exceptions.InternalServerError(error.message);
  }
};

export default loginUser;
