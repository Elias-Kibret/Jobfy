import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../Controller/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(updateUser);

export default router;
