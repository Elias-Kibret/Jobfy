import { useState, useEffect } from "react";
const initialState = {
	name: '',
	email: '',
	password: '',
	isMember:true
}

const Register = () => {
	const [value, setValue] = useState(initialState)
	//global state and useNavigate
	return (
		<>
			<h1>Register</h1>;
		</>
	);
};
export default Register;
