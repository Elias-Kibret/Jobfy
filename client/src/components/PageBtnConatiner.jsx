
import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"
const PageBtnConatiner = () => {
    const { numOfPages, page } = useAppContext()
    const prevPage = () => {
        
    }
    const nextpage = () => {
        
    }
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        
    })
  return (
      <Wrapper>
          <button className="prev-btn" onClick={prevPage}>
              <HiChevronDoubleLeft />
            prev  
          </button>
          <div className="btn-container">buttons</div>
          <button className="prev-btn" onClick={nextpage}>
              <HiChevronDoubleRight />
            next
          </button>
    </Wrapper>
  )
}
export default PageBtnConatiner