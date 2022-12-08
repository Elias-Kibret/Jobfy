import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./DB/connect.js";
import jobModel from "./Model/JobModel.js";
import job from "./Model/JobModel.js";

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		await job.deleteMany();
		const jsonProducts = JSON.parse(
			await readFile(new URL("./mock_data.json", import.meta.url))
		);
		await job.create(jsonProducts);
		console.log("success");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
