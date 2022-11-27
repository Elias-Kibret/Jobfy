import { CustomAPIError } from "./custom-API-Error.js";
import { StatusCodes } from "http-status-codes";
export class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}
