
import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"
const PageBtnConatiner = () => {
    const { numOfPages, page,changePage } = useAppContext()
    const prevPage = () => {
        let newPage = page - 1
        if (newPage < 1) {
            newPage=1
        }
        changePage(newPage)
    }
    const nextpage = () => {
        let newPage = page + 1;
        if (newPage>numOfPages) {
           newPage=numOfPages 
        }
        changePage(newPage)
    }
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index+1
    })
    console.log(pages)
    console.log(numOfPages)
  return (
      <Wrapper>
          <button className="prev-btn" onClick={prevPage}>
              <HiChevronDoubleLeft />
            prev  
          </button>
          <div className="btn-container">
              
              {
                  pages.map((pageNumber) => {
                      return <button type="button" className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                      key={pageNumber}
                      onClick={()=>changePage(pageNumber)}
                      >{pageNumber}</button>
                  })
              }
          </div>
          <button className="prev-btn" onClick={nextpage}>
          next
              <HiChevronDoubleRight />
        
          </button>
    </Wrapper>
  )
}
export default PageBtnConatiner