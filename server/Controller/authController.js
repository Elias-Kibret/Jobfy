import userModel from "../Model/UserModel.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req, res, next) => {
	const user = await userModel.create(req.body);
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
