import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../Controller/authController.js";
import authenticate_Middleware from "../middleware/auth.js";
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticate_Middleware, updateUser);

export default router;
