import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import { CLEAR_ALERT, DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR } from "./actions";
import reducer from "./reducer";
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
	isLoading: false,
	showAlert: false,
	alertType: "",
	alertText: "",
	user: user?JSON.parse(user):null,
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
	const regiterUser = async (currentUser) => {
		console.log(currentUser)
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const response = await axios.post('/api/v1/auth/register', currentUser)
			console.log(response)
			const { user, token, location } = response.data
			dispatch({
				type: REGISTER_USER_SUCCESS, payload: {
				user,token,location
				}
			})
			//local storage later
			addUserToLocalStorage({user,token,location})
		} catch (error) {
			console.log(error.response)
			dispatch({ type:REGISTER_USER_ERROR,payload:{msg:error.response.data.msg}})
		}
		clearAlert()
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

	return (
		<AppContext.Provider value={{ ...state,displayAlert,regiterUser }}>
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
