import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
} from "./actions";
const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: "Please provide all values",
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}

	if (action.type === SETUP_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			location: action.payload.location,
			jobLocation: action.payload.jobLocation,
			showAlert: true,
			alertType: "success",
			alertText: action.payload.alertText,
		};
	}
	if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}
	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSidebar: !showSidebar,
		};
	}

	throw new Error(`no such action :${action}`);
};
export default reducer;
