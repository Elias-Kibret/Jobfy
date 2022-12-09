import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_ERROR,
	CREATE_JOB_SUCCESS,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	SET_EDIT_SUCCESS,
	SET_EDIT_BEGIN,
	EDIT_JOBS_BEGIN,
	EDIT_JOBS_SUCCESS,
	EDIT_JOBS_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from "./actions";
import { initialState } from "./appContext";
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
			showSidebar: !state.showSidebar,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			userLoaction: null,
			jobLocation: null,
		};
	}
	if (action.type === UPDATE_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === UPDATE_USER_SUCCESS) {
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
	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}
	if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	}
	if (action.type === CLEAR_VALUES) {
		const initialState = {
			isEditing: false,
			editJobId: "",
			position: "",
			company: "",
			jobLocation: state.userLoaction,
			jobType: "full-time",
			status: "pending",
		};
		return {
			...state,
			...initialState,
		};
	}
	if (action.type === CREATE_JOB_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === CREATE_JOB_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "New Job is Created",
		};
	}
	if (action.type === CREATE_JOB_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}
	if (action.type === GET_JOBS_BEGIN) {
		return { ...state, isLoading: true, showAlert: false };
	}
	if (action.type === GET_JOBS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			jobs: action.payload.jobs,
			totalJobs: action.payload.totalJobs,
			numOfPages: action.payload.numOfPages,
		};
	}
	if (action.type === SET_EDIT_BEGIN) {
		const job = state.jobs.find((job) => job._id === action.payload.id);
		const { _id, position, company, jobLocation, jobType, status } = job;
		return {
			...state,
			isEditing: true,
			editJobId: _id,
			position,
			company,
			jobLocation,
			jobType,
			status,
		};
	}
	if (action.type === EDIT_JOBS_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === EDIT_JOBS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "Job Updated",
		};
	}
	if (action.type === EDIT_JOBS_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			allerType: "danger",
			alertText: action.payload.msg,
		};
	}
	if (action.type === SHOW_STATS_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		};
	}
	if (action.type === SHOW_STATS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			stats: action.payload.stats,
			monthlyApplications: action.payload.monthlyApplications,
		};
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			search: "",
			searchStatus: "all",
			searchType: "all",
			sort: "latest",
		};
	}
	if (action.type === CHANGE_PAGE) {
		return {
			...state,
			page: action.payload.page,
		};
	}

	throw new Error(`no such action :${action}`);
};
export default reducer;
