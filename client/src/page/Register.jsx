import { useState, useEffect } from "react";
import { Alert } from ".";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo,FormRow } from "../components";
import { useAppContext } from "../context/appContext";

const Register = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
		isMember: true,
	
	}
	const [values, setValues] = useState(initialState)
	//global state and useNavigate
	const {isLoading,showAlert} = useAppContext()
	console.log(state)
	const handleChange = (e) => {
		console.log(e.target)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		console.log(e.target)
	}

	const toggleMemeber = () => {
		setValues({...values,isMember:!values.isMember})
	}
	
	return (
		<div className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember?"Login":"Register" }</h3>
                {showAlert&&(<Alert/>)}
				{/* Name input */}
				{!values.isMember
				&&<FormRow  
				type="text"
				labelText="Name"
				name="name"
				value={values.name}
				handleChange={handleChange}
			/>
				}

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
				<p>
					{values.isMember?'Not a Member Yet ?':'Already a member?'}
					<button type="button" onClick={toggleMemeber} className="member-btn">
						{values.isMember?"Register":"Login"}
					</button>
				</p>
			</form>
		</div>
	);
};
export default Register;
