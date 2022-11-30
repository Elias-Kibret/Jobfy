import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import {
	CLEAR_ALERT,
	DISPLAY_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR
} from "./actions";


import reducer from "./reducer";
import e from "cors";
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
	isLoading: false,
	showAlert: false,
	alertType: "",
	alertText: "",
	user: user!==undefined?JSON.parse(user):null,
	token: token || null,
	userLocation:userLocation || '',
	jobLocation:userLocation || ''
};
//Create context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	
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

	

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		 console.log(currentUser, endPoint, alertText)
		// const {name}=currentUser
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
			// console.log(error.response.data)
			dispatch({
				type:SETUP_USER_ERROR,
			payload:{msg:"error.response.data.msg"}})
		}
		clearAlert()
}

	return (
		<AppContext.Provider value={{ ...state,displayAlert,setupUser}}>
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
