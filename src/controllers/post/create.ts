import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as Post from "../../services/post";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
const createPost = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const { title, content } = req.body;
    const message = Lib.validator.validateUser(["title", "content"], req.body);
    if (message) {
      return Lib.jsonResponse(res, {
        statusCode: 400,
        data: {
          message,
        },
      });
    }

    const payload = {
      title,
      content,
      userId: req.user.id, //request user id
    };

    const post = await Post.createPost(payload);
    return Lib.jsonResponse(res, {
      statusCode: 201,
      data: post,
    });
  } catch (error) {
    console.log({ error });

    return exceptions.InternalServerError(error.message);
  }
};

export default createPost;
