import mongoose from "mongoose";
import validator from "validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide name"],
			minLength: 3,
			maxLength: 20,
			trim: true,
		},
		lastName: {
			type: String,
			maxLength: 20,
			trim: true,
			default: "",
		},
		email: {
			type: String,
			required: [true, "Please provide Email"],
			validate: {
				validator: validator.isEmail,
				message: "Please provide a valid email",
			},
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide Password"],
			minLenth: 6,
		},
		location: {
			type: String,
			minLength: 3,
			maxLength: 20,
			trim: true,
			default: "My city",
		},
	},
	{
		methods: {
			createJWT() {
				return jwt.sign(
					{
						userId: this._id,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "1d",
					}
				);
			},
		},
	}
);
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	return next();
});
const user = mongoose.model("User", userSchema);

export default user;
