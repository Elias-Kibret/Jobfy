import { StatusCodes } from "http-status-codes";
export class CustomAPIError extends Error {
	constructor(message) {
		super(message);
		// this.statusCode = StatusCodes.BAD_REQUEST;
	}
}
