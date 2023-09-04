import { Request, Response } from "express";
import { Op } from "sequelize";
import post from "../../models/post";

type SearchPostFunction = (req: Request, res: Response) => Promise<void>;

//search post
const searchPost: SearchPostFunction = async (req, res) => {
  try {
    const { query } = req.query;
    console.log({ query });

    const posts = await post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default searchPost;
