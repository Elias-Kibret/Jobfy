import express from "express";
const router = express.Router();
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 10,
	message:
		"Too many requests from this Ip address ,please try  again after 15 minutes",
});
import { register, login, updateUser } from "../Controller/authController.js";
import authenticate_Middleware from "../middleware/auth.js";
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticate_Middleware, updateUser);

export default router;
