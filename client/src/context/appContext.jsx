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
	CREATE_JOB_SUCCESS
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
	status:'pending'


};
//Create context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState);
 


	// axios.defaults.headers['Authorization'] = `Bearer ${state.token}`
	axios


     // Instance of of axios
	
	const AuthFetch  = axios.create({
		baseURL: '/api/v1'
		
	})

	// request interceptors


	AuthFetch.interceptors.request.use((config) => {
		// Do something before request is sent
		console.log(state.token)
		config.headers.Authorization = `Bearer ${state.token}`
		console.log(config)
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
			createJob
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
