import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as User from "../../services/user";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";
import bcrypt from "bcrypt";

const exceptions: ExceptionError = new ExceptionError();
const createUser = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const message = Lib.validator.validateUser(
      ["firstName", "lastName", "email", "password"],
      req.body
    );
    if (message) {
      return Lib.jsonResponse(res, {
        statusCode: 400,
        data: {
          message,
        },
      });
    }

    let passwordHash = bcrypt.hashSync(password, 10);
    const payload = {
      firstName,
      lastName,
      email,
      password: passwordHash,
    };

    const user = await User.createUser(payload.email, payload);
    return Lib.jsonResponse(res, {
      statusCode: 201,
      data: user,
    });
  } catch (error) {
    return exceptions.InternalServerError(error.message);
  }
};

export default createUser;
