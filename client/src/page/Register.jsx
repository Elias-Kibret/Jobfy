import { useState, useEffect } from "react";
import  Alert  from "../components/Alert";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo,FormRow } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
		isMember: true,
	
	}
	const [values, setValues] = useState(initialState)
	//global state and useNavigate
	const navigate=useNavigate()
	const {user,isLoading,showAlert,displayAlert ,setupUser} = useAppContext()

	const handleChange = (e) => {
		setValues({...values,[e.target.name]:e.target.value})
	}
	const onSubmit = (e) => {
		e.preventDefault()
		const { name, email, password, isMember } = values
		if (!email || !password || (!isMember && !name))
		{
			displayAlert()
			return
		}
		const currentUser = { name, email, password }
		console.log(currentUser)
		if (isMember) {
			console.log('Already a member')
			setupUser({currentUser,endPoint:'login',alertText:'Login Successful! Redirecting...'})
		}
		else {
			setupUser({currentUser,endPoint:'register',alertText:'Registered Successful! Redirecting...'})

		}
		console.log(e.target)
		 
	}

	const toggleMemeber = () => {
		setValues({...values,isMember:!values.isMember})
	}
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				
				navigate('/')
			},3000)
		}
	},[user,navigate])
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
					name="password"
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
