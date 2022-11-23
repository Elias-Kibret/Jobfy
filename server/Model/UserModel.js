import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
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
});

const user = mongoose.model("User", userSchema);

export default user;
