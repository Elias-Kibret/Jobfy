import { StatusCodes } from "http-status-codes";
const notFoundMiddleware = (req, res) => {
	res.status(404).send("Route does not exist");
};

export default notFoundMiddleware;
