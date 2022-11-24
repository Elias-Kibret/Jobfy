import userModel from "../Model/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { BadREquestError } from "../Errors/index.js";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadREquestError("Please provide all values");
	}
	const user = await userModel.create({ name, email, password });
	res.status(StatusCodes.CREATED).json(user);
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
