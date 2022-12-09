import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_ERROR,
	CREATE_JOB_SUCCESS,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	SET_EDIT_BEGIN,
	SET_EDIT_SUCCESS,
	SET_DELETE_BEGIN,
	SET_DELETE_SUCCESS,
	EDIT_JOBS_BEGIN,
	EDIT_JOBS_SUCCESS,
	EDIT_JOBS_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE
} from "./actions";


import reducer from "./reducer";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
	isLoading: false,
	showAlert: false,
	alertType: "",
	alertText: "",
	user: user!==undefined?JSON.parse(user):null,
	token: token || null,
	userLocation:userLocation || '',
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: userLocation || '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined','pending'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	numOfpages: 1,
	page: 1,
	stats:{},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
	searchType: 'all',
	
	
};
//Create context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState);
 
	axios
	const AuthFetch  = axios.create({
		baseURL: '/api/v1'
		
	})
	AuthFetch.interceptors.request.use((config) => {
		// Do something before request is sent

		config.headers.Authorization = `Bearer ${state.token}`
	
	    return config	
	}, (error) => {
		// Do something with request error
		return Promise.reject(error)
	})

	//response interceptors

	AuthFetch.interceptors.response.use((response) => {
		// 2xx cause this function to trigger
		// Do something with response data

		return response	
	}, (error) => {
		// 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			logoutUser()
			removeUserFromLocalStorage()
		}
		return Promise.reject(error)
	})
	
	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({type:CLEAR_ALERT})
		},2000)
	}

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
		localStorage.setItem('location',location)
	}
	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		localStorage.removeItem('location')
	}
	const toggleSideBar = () => {
	dispatch({type:TOGGLE_SIDEBAR})
	}
	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER,payload:{showSidebar:false} })
		removeUserFromLocalStorage()
	}
	

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		 console.log(currentUser, endPoint, alertText)
		console.log(endPoint)
		dispatch({ type: SETUP_USER_BEGIN })
		try {

			const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
			// console.log(response.data)
			const { user, token, location } = response.data
			console.log(user)
			dispatch({
				type: SETUP_USER_SUCCESS,
			payload:{user,token,location,alertText}
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			
			dispatch({
				type:SETUP_USER_ERROR,
			payload:{msg:"error.response.data.msg"}})
		}
		clearAlert()
	}
	
	const updateUser = async (currentData) => {
		dispatch({type:UPDATE_USER_BEGIN})
		try {
			const response = await AuthFetch.patch('/auth/updateUser', currentData)
			console.log(response.data)
			const {user,token,location}=response.data
			dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } })
			addUserToLocalStorage({user,token,location})
		} catch (error) {
			if (error.response.status !== 401) {
				
				dispatch({ type: UPDATE_USER_ERROR, payload: { msg: '' } })
			}
		}
		clearAlert()
	}
	const handleChange = ({ name, value }) => {
	dispatch({type:HANDLE_CHANGE,payload:{name,value}})
	}
	
	const handleClear = () => {
		dispatch({type:CLEAR_VALUES})
	}

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN })
		try {
			const { position, company, jobLocation, jobType, status } = state
			console.log(state)
			await AuthFetch.post('/job', {
				position,
				company,
				jobLocation,
				jobType,
				status
			})
	
			dispatch({ type: CREATE_JOB_SUCCESS })
			dispatch({type:CLEAR_VALUES})
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({ type:CREATE_JOB_ERROR,payload:{msg:'Error'}})
			
		}
		clearAlert()
	}

	const getAllJob = async () => {
		const {page, search, searchStatus, searchType, sort } = state
		let url = `/job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
		if (search) {
			url=url+`&search=${search}`
		}
		dispatch({ type: GET_JOBS_BEGIN })
		try {
			const  response = await AuthFetch.get(url)
			console.log(response.data)
			const { jobs, totalJobs, numOfPages } = response.data
			dispatch({
				type: GET_JOBS_SUCCESS, payload: {
					jobs,
					totalJobs,
					numOfPages
			}})
			
		} catch (error) {
			
		}
		clearAlert()
	}
	

	const setEditJob = async (id) => {
	
		dispatch({type:SET_EDIT_BEGIN,payload:{id}})
	}


	const editJob = async (  ) => {
		dispatch({type:EDIT_JOBS_BEGIN})
		try {
			const { company,
				jobType,
				jobLocation,
				status,
				position
			 } = state
		
			const response = await AuthFetch.patch(`/job/${state?.editJobId}`, {
				 company,
				jobType,
				jobLocation,
				status,
				position
			}	)
			dispatch({ type: EDIT_JOBS_SUCCESS})
			dispatch({type:CLEAR_VALUES})
			
		} catch (error) {
			if (error.response.status === 401) return
			dispatch({ type: EDIT_JOBS_ERROR, payload: { msg: error.response.msg } })
		}
		
		
	}
	const deleteJob = async (jobId) => {
		// dispatch({ type: SET_DELETE_BEGIN })
		try {
			await AuthFetch.delete(`/job/${jobId}`)
			getAllJob()
		} catch (error) {
		
		}
	}
	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN })
		try {
			const response = await AuthFetch.get(`/job/stats`)
			dispatch({
				type: SHOW_STATS_SUCCESS, payload: {
					stats: response.data.defaultStats,
					monthlyApplications:response.data.monthlyApplications
			}})
		} catch (error) {
			console.log(error.response.msg)
		}
		clearAlert()
	}
	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
		
	}
	const changePage = (page) => {
		dispatch({type:CHANGE_PAGE,payload:{page}})
	}

	return (
		<AppContext.Provider value={{
			...state,
			displayAlert,
			setupUser,
			updateUser,
			toggleSideBar,
			handleClear,
			logoutUser,
			handleChange,
			createJob,
			getAllJob,
			setEditJob,
			deleteJob,
			editJob,
			showStats,
			clearFilters,
			changePage 
		}}>
			{/* Render child components */}
			{children}
		</AppContext.Provider>
	);
};
//Create customHooks
const useAppContext = () => {
	return useContext(AppContext);
};
export { AppProvider, useAppContext};
