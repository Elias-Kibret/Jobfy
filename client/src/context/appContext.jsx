import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import { CLEAR_ALERT, DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR } from "./actions";
import reducer from "./reducer";
const initialState = {
	isLoading: false,
	showAlert: false,
	alertType: "",
	alertText: "",
	user: null,
	token: null,
	userLocation: '',
	jobLocation:''
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
		} catch (error) {
			console.log(error.response)
			dispatch({ type:REGISTER_USER_ERROR,payload:{msg:error.response.data.msg}})
		}
		clearAlert()
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
