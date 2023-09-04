import { Router } from "express";
import * as User from "../controllers/user";

const router = Router();

const { createUser, loginUser } = User;

router.post("/sign-up", createUser);
router.post("/login", loginUser);

export default router;
