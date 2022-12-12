import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-API-Error.js";
export class BadREquestError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}
