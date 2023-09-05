import { Router } from "express";
import * as Post from "../controllers/post";
import { isCurrentUserLoggedIn } from "../utils/authCheck";

const router = Router();

const {
  createPost,
  updatePost,
  deletePost,
  findAllPosts,
  findPost,
  searchPost,
} = Post;

router.get("/search", searchPost);
router.post("/create", isCurrentUserLoggedIn, createPost);
router.put("/edit/:id", isCurrentUserLoggedIn, updatePost);
router.get("/", findAllPosts);
router.get("/:id", findPost);
router.delete("/delete/:id", isCurrentUserLoggedIn, deletePost);

export default router;
