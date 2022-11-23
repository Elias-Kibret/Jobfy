import express from "express";
import errorHandlerMiddleware from "./middleware/error.js";
import notFoundMiddleware from "./middleware/not-found.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

//middleware
app.get("/", (req, res) => {
	throw new Error("error");
	res.send("Welcome");
});
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server is running port ${PORT}`);
});
