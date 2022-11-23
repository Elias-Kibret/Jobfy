import userModel from "../Model/UserModel.js";

export const register = async (req, res, next) => {
	try {
		const user = await new userModel(req.body);
		user.save();
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
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
