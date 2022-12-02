import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthenticatedError } from "../Errors/index.js";
dotenv.config();
const authenticate_Middleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new UnauthenticatedError("Authentication Invalid");
	}
	const token = authHeader.split(" ")[1];
	console.log(token);
	try {
		jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
			if (user) {
				req.user = user.userId;
				next();
			}
			if (err) {
				throw new UnauthenticatedError("Invalid Token");
			}
		});
	} catch {
		throw new UnauthenticatedError("Authentication Invalid");
	}
};

export default authenticate_Middleware;
