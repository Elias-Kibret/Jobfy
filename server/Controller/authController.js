import userModel from "../Model/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { BadREquestError, UnauthenticatedError } from "../Errors/index.js";

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
	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
		},
		token: token,
	});
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadREquestError("Please Provide all values");
	}
	const user = await userModel.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	if (!(await user.comparePassword(password))) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const token = user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.OK).json({ user, token });
};

// 👨‍💻 Elias Kibret

export const updateUser = (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
