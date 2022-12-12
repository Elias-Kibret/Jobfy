import mongoose from "mongoose";
mongoose.set("strictQuery", true);
export const connectDB = (url) => {
	mongoose.connect(url, () => {});
};
