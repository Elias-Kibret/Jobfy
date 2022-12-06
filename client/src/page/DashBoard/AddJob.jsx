import { FormRow,Alert } from '../../components'
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
const AddJob = () => {
	const { isEditing, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, statusOptions } = useAppContext()
	 
	const [jobState, setJobState] = useState([{
		position: '',
		company: '',
		jobLocation:''
	}])
	const [info, setInfo] = useState([{
		Name: '',
		Email: ''
		 }])
	
	const inputsProperty = [
		{
			id:1,
			type: 'text',
			name: 'Name',
			placeHolder:'FirstName'
		},
		{
			id: 2,
			type: 'email',
			name: 'Email',
			placeHolder:'Email'
		},
	

	]
	
	const handleOnChange = (e) => {

		setInfo({...info,[e.target.name]:[e.target.value]})
	}

    


	// console.log(position,company,jobLocation)
	const handeleSubmit = (e) => {
		e.preventDefault()
		if (!position || !company || !jobLocation) {
			displayAlert()
			return
		}
		
		
	}
	// console.log(jobState.position)
	// console.log(jobState.company)

	const handleJobInput = (e) => {
		e.preventDefault()

		setJobState({...jobState,[e.target.name]:[e.target.value]})
		// switch (e.target.name) {
		// 	case position: 
		// 		jobState.position= e.target.value
		// 		break
		// 	case company:
		// 		jobState.company = e.target.value
		// 		break
		// 	case jobLocation:
		// 		jobState.jobLocation= e.target.value
		// 		break
		
		// }
		
	}
	return <Wrapper>
		<form className='form'>
			<h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
			{
				showAlert&&<Alert/>
			}
			<div className='form-center'>
				{/* Position */}
				{
					inputsProperty .map((items) => {
						
						return (
							<input key={items.id}
								type={items.type}
								name={items.name}
								value={info.value}
								placeholder={items.placeHolder}
								onChange={handleOnChange} />
						)
					})
				}
			
				<FormRow
					type="text"
					name="position"
					value={jobState.position}
					handleChange={handleJobInput}
				/>
				{/* Company */}
				<FormRow
					type="text"
					name="company"
					value={jobState.company}
					handleChange={handleJobInput}
				/>
				{/* Location */}
				<FormRow
					type="text"
					name="jobLocation"
					value={jobState.jobLocation}
					handleChange={handleJobInput}
				/>

				<FormRow
					type="text"
					labelText='Job Location'
					name="jobLocation"
					value={jobLocation}
					handleChange={handleJobInput}
				/>

				{/* Job Type */}
				<div className='btn-container'>
					<button type="submit" className='btn btn-block submit-btn'>
						Submit
				   </button>
				</div>
				{/* Job Status */}

			</div>
		</form>
	</Wrapper>;
};
export default AddJob;
