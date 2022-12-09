import { useAppContext } from "../context/appContext"
import { useEffect } from "react"
import Loading from "./Loading"
import Job from "./Job"
import PageBtnConatiner from "./PageBtnConatiner"
import Wrapper from "../assets/wrappers/JobsContainer"
const JobContainer = () => {
    const { getAllJob, jobs, isLoading, page, totalJobs,searchStatus,searchType,sort,search ,numOfPages} = useAppContext()
    useEffect(() => {
        getAllJob()  
        
    }, [searchStatus,searchType,sort,search ])
    if (isLoading) {
        return<Loading center/>
    }
    if (jobs.length === 0) {
        return <Wrapper>
            <h2>
                No Job to Displ
            </h2>
        </Wrapper>
    }
  return (
      <Wrapper>
          <h5>
              {totalJobs} job{jobs.length>1&&'s'}
          </h5>
          <div className="jobs">
              {jobs.map((job) => {
                  return<Job key={job._id} {...job}/>
              })}
              
          </div>
          {numOfPages>1&&<PageBtnConatiner/>}
          
</Wrapper>
  )
}
export default JobContainer