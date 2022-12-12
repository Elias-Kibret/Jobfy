import mongoose from "mongoose";

export const connectDB = (url) => {
	mongoose.connect(url, () => {});
};
