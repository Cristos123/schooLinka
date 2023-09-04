import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as Post from "../../services/post";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
const findPost = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const id = req.params.id;
    const user = await Post.findSinlePost(Number(id));
    return Lib.jsonResponse(res, {
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    return exceptions.InternalServerError(error.message);
  }
};

export default findPost;
