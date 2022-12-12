import express from "express";
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error.js";
import notFoundMiddleware from "./middleware/not-found.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DB/connect.js";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
//routes
import authRouter from "./Routes/authRoutes.js";
import jobRouter from "./Routes/jobRoutes.js";
app.use(cors());

//middleware
import authenticate_Middleware from "./middleware/auth.js";
app.get("/", (req, res) => {
	// throw new Error("error");
	res.send("Welcome");
});
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", authenticate_Middleware, jobRouter);
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/dist/index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async (req, res) => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(PORT, () => {
			console.log(`server is running port ${PORT}`);
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

start();
