import { Request, Response } from "express";
import * as Lib from "../../libs/index";
import * as Post from "../../services/post";
import ExceptionError from "../../libs/exceptions";
import { ErrorResponse } from "../../interfaces/error";

const exceptions: ExceptionError = new ExceptionError();
const findAllPosts = async (
  req: Request,
  res: Response
): Promise<Response | ErrorResponse> => {
  try {
    const { limit, offset } = req.query;
    const attributes = {
      exclude: ["updatedAt", "createdAt"],
    };
    const query = {
      offset: offset ? Number(offset) : 0,
      limit: limit ? Number(limit) : 10,
      attributes,
      order: [["id", "DESC"]], // sort data in descending order using id
      separate: true, // sorting will not work if this is missing
    }; // get actual skip and limit from query params

    const posts = await Post.findAllPosts(query);
    return Lib.jsonResponse(res, {
      statusCode: 200,
      data: posts,
    });
  } catch (error) {
    return exceptions.InternalServerError(error.message);
  }
};

export default findAllPosts;
