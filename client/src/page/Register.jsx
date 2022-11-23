import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo,FormRow } from "../components";

const Register = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
		isMember:true
	}
	const [values, setValue] = useState(initialState)
	const handleChange = (e) => {
		console.log(e.target)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		console.log(e.target)
	}
	//global state and useNavigate
	return (
		<div className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>Login</h3>

				{/* Name input */}
				<FormRow  
					type="text"
					labelText="Name"
					name="name"
					value={values.name}
					handleChange={handleChange}
				/>
			<FormRow  
				type="email"
				labelText="Email"
				name="email"
				value={values.email}
				handleChange={handleChange}
			/>

               <FormRow  
					type="password"
					labelText="Password"
					name="Password"
					value={values.password}
					handleChange={handleChange}
				/>
			
				<button type="sumbit" className="btn btn-block">Submit</button>
			</form>
		</div>
	);
};
export default Register;
