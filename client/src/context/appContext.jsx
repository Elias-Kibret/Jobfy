import React, { useState, useReducer, useContext } from "react";
const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertText: "",
};
//Create context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, setState] = useState(initialState);
	return (
		<AppContext.Provider value={{ ...state }}>
			{/* Render child components */}
			{children}
		</AppContext.Provider>
	);
};
//Create customHooks
const useAppContext = () => {
	return useContext(AppContext);
};
export { AppProvider, useAppContext };
