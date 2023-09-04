import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as Post from "../../services/post";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
const updatePost = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const id = req.params.id;
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
    };
    const getUserIdPost = await Post.findSinlePost(Number(id));
    console.log({ getUserIdPost });

    if (typeof getUserIdPost === "object" && "userId" in getUserIdPost) {
      if (Number(req.user.id) === Number(getUserIdPost.userId)) {
        const post = await Post.updatePost(Number(id), payload);
        if (!post) {
          return Lib.jsonResponse(res, {
            statusCode: 403,
            data: "error cant update your post",
          });
        }
        return Lib.jsonResponse(res, {
          statusCode: 200,
          data: post,
        });
      } else {
        return Lib.jsonResponse(res, {
          statusCode: 403,
          data: "You are not authorized to edit this post as it does not belong to you",
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

export default updatePost;
