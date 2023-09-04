import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as Post from "../../services/post";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
const deletePost = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const id = req.params.id;
    const getUserIdPost = await Post.findSinlePost(Number(id));
    console.log({ getUserIdPost });
    if (typeof getUserIdPost === "object" && "userId" in getUserIdPost) {
      if (Number(req.user.id) === Number(getUserIdPost.userId)) {
        const deletedPost = await Post.deletePost(Number(id));
        return Lib.jsonResponse(res, {
          statusCode: 200,
          data:
            deletedPost === 1
              ? {
                  message: "Post deleted successfully",
                }
              : exceptions.NotFoundError("Post does not exist"),
        });
      } else {
        return Lib.jsonResponse(res, {
          statusCode: 403,
          data: "You are not authorized to delete this post as it does not belong to you",
        });
      }
    } else {
      return Lib.jsonResponse(res, {
        statusCode: 403,
        data: "Invalid post data",
      });
    }
  } catch (error) {
    return exceptions.InternalServerError(error.message);
  }
};

export default deletePost;
