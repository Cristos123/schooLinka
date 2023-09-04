import { Router } from "express";
import UserRoutes from "./user";
import PostRoute from "./post";

const router = Router();

router.use("/user", UserRoutes);
router.use("/posts", PostRoute);

export default router;
