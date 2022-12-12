import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import {useState,useMemo} from 'react'
const SearchContainer = () => {
  const [localSearch,setLocalSearch]=useState()
  const {
    isLoading,
    search,
    searchType,
    searchStatus,
    sort,
    sortOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
    statusOptions
  } = useAppContext()
  
  const handeSearch = (e) => {
    if (isLoading) return
    handleChange({name:e.target.name,value:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  const debounce = () => { 
    let timeoutID;
return (e) => {
  setLocalSearch(e.target.value)
  clearInterval(timeoutID)
  timeoutID = setTimeout(() => {
    handleChange({ name: e.target.name, value: e.target.value })
  },1000)
    }
  }
  const optimizedDebounce=useMemo(()=>debounce(),[])
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className="form-center">
          {/* search by position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce} >
            
            </FormRow>
          
          {/* Search by Status */}
          <FormRowSelect
            labelText="Job Status"
            type='text'
            name='searchStatus'
            value={searchStatus}
            list={['all', ...statusOptions]}
            handleChange={handeSearch}
           ></FormRowSelect>
            {/* Search by Type */}
            <FormRowSelect
            labelText="Job Type"
            type='text'
            name='searchType'
            value={searchType}
          
            list={['all', ...jobTypeOptions]}
            handleChange={handeSearch}
          ></FormRowSelect>
            <FormRowSelect
              name='sort'
              value={sort}
            
            list={['all', ...sortOptions]}
            handleChange={handeSearch}
            ></FormRowSelect>
          <button className='btn btn-block btn-danger' disabled={isLoading}
          onClick={handleSubmit}
          >
      Clear filters          
</button>
           </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer