import userModel from "../Model/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { BadREquestError } from "../Errors/index.js";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadREquestError("Please provide all values");
	}
	const userAlreadtExists = await userModel.findOne({ email });
	if (userAlreadtExists) {
		throw new BadREquestError("Email already in use");
	}
	const user = await userModel.create({ name, email, password });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ name: user.getName(), token: token });
};

export const login = (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updateUser = (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
