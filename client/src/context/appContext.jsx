import React, { useState, useReducer, useContext } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";
import reducer from "./reducer";
const initialState = {
	isLoading: false,
	showAlert: false,
	alertType: "",
	alertText: "",
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

	return (
		<AppContext.Provider value={{ ...state,displayAlert }}>
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
