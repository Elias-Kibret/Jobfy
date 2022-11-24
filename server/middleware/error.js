import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
	const defaultError = {
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		msg: "Something went wrong ,try again later",
	};
	if (err.name === "ValidationError") {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = err.message;
	}
	res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
export default errorHandlerMiddleware;
