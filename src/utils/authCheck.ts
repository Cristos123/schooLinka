import env from "../config/env";
import ExceptionError from "../libs/exceptions";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number; // Define the structure of your JWT payload here
  // Other fields in your JWT payload
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
const cookiesSecretKey = env.SECRETKEY;
const exceptions: ExceptionError = new ExceptionError();
const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers && req.headers.authorization?.indexOf("Bearer ") !== -1) {
      const token = req.headers.authorization;

      if (token) {
        const onlyToken = token.slice(7, token.length);

        if (onlyToken) {
          jwt.verify(onlyToken, cookiesSecretKey, (err, decode) => {
            if (!err) {
              req.user = decode as JwtPayload;
              //   console.log(" req.user", req.user);
              return next();
            } else {
              console.log("JWT Verification Error:", err);
            }

            return next();
          });
        } else {
          return exceptions.UnauthorizedError("Token not valid");
        }
      } else {
        return next();
      }
    } else {
      return next();
    }
  } catch (error) {
    console.error("error ", error);
    if (!!error && typeof error.message === "string") {
      return exceptions.InternalServerError(error.message);
    } else {
      return exceptions.UnauthorizedError("error  user not authenticated");
    }
  }
};
const isCurrentUserLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    // console.log({ user }, "req");

    if (!!user) {
      console.log("user", user);
      return next();
    } else {
      return exceptions.UnauthorizedError("Please login to continues");
    }
  } catch (error) {
    console.log({ error });
    if (!!error && typeof error.message === "string") {
      return exceptions.InternalServerError(error.message);
    }
  }
};
export { authCheck, isCurrentUserLoggedIn };
