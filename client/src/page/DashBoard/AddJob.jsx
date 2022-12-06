import { FormRow,Alert } from '../../components'
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { FormRowSelect } from '../../components/FormRowSelect';
const AddJob = () => {
	const { isEditing,  handleChange,showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status,statusOptions } = useAppContext()
	 

	const handeleSubmit = (e) => {
		e.preventDefault()
		if (!position || !company || !jobLocation) {
			displayAlert()
			return
		}
		
		
	}
	

	const handleJobInput = (e) => {
		e.preventDefault()
		const name = e.target.name
		const value = e.target.value
		handleChange({name,value})
		
		
	}
	return <Wrapper>
		<form className='form'>
			<h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
			{
				showAlert&&<Alert/>
			}
			<div className='form-center'>
				{/* Position */}

			
				<FormRow
					type="text"
					name="position"
					value={position}
					handleChange={handleJobInput}
				/>
				{/* Company */}
				<FormRow
					type="text"
					name="company"
					value={company}
					handleChange={handleJobInput}
				/>
				{/* Location */}
				<FormRow
					type="text"
					labelText='Job Location'
					name="jobLocation"
					value={jobLocation}
					handleChange={handleJobInput}
				/>

				{/* Job Type */}
				<FormRowSelect
					name='jobType'
					labelText='Job Type'
					list={jobTypeOptions}
					handleChange={handleJobInput}
					value={jobType}
				/>
				<FormRowSelect
					name='status'
					list={statusOptions}
					handleChange={handleJobInput}
					value={status}
				/>
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
