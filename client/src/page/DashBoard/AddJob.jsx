import { FormRow,Alert } from '../../components'
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
const AddJob = () => {
	const { isEditing, showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, statusOptions } = useAppContext()

	const handleJobInput = (e) => {
		e.preventDefault()
		console.log(e.target.value)
		
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
					name="jobLocation"
					value={jobLocation}
					handleChange={handleJobInput}
				/>

				<FormRow
					type="text"
					labelText='Job Location'
					name="jobLocation"
					value={jobLocation}
					handleChange={handleJobInput}
				/>

			</div>
		</form>
	</Wrapper>;
};
export default AddJob;
