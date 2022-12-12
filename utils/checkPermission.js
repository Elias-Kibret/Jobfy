import { UnauthenticatedError } from "../Errors/index.js";
const checkPermissions = (requestUser, resourceUserId) => {
	if (requestUser === resourceUserId.toString()) return;
	throw new UnauthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
