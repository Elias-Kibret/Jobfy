import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please provide company"],
			maxLength: 50,
		},
		position: {
			type: String,
			required: [true, "Please provide position"],
			maxLength: 100,
		},
		status: {
			type: String,
			enum: ["interview", "declined", "Pending"],
			default: "Pending",
		},
		jobType: {
			type: String,
			enum: ["full-time", "part-time", "remote", "internship"],
			default: "full-time",
		},
		jobLocation: {
			type: String,
			default: "My-City",
			required: true,
		},
		creetedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User".at,
			required: [true, "Please provide user"],
		},
	},
	{
		timestamps: true,
	}
);

const job = new mongoose.model("Job", jobSchema);

export default job;
