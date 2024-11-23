import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';


const PageBtnContainerComplex = () => {
    const {data : {numOfPages , currentPage}} = useAllJobsContext();
   const pages = Array.from({length : numOfPages} , (_,index)=>{return index +1})


   const {search , pathname} = useLocation();
   const navigate = useNavigate();
   console.log(search , pathname);

   const handlePageNumber = (pageNumber)=>{
    const searchParams = new URLSearchParams(search)
    searchParams.set('page' , pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`);
   }
   const addPageButton = ({pageNumber , activeClass})=>{
    return <button className={`btn page-btn ${activeClass && 'active'}`} key={pageNumber} 
    onClick={()=> handlePageNumber(pageNumber)}>
        {pageNumber}
    </button>

   }

   const renderPageButtons = ()=>{
    const pageButtons = [];
    // First Page
    pageButtons.push(addPageButton({pageNumber : 1 , activeClass : currentPage === 1}))
    // One before current page
    if(currentPage !=1 && currentPage!=2){
        pageButtons.push(addPageButton({pageNumber : currentPage - 1 , activeClass : false}))
    }
    // Current page
    if(currentPage !== 1 && currentPage !== numOfPages){
        pageButtons.push(addPageButton({pageNumber : currentPage , activeClass : true}))

    }
    // one after the current page
    if(currentPage !=numOfPages && currentPage!=numOfPages - 1){
        pageButtons.push(addPageButton({pageNumber : currentPage + 1 , activeClass : false}))
    }
    // last page
    pageButtons.push(addPageButton({pageNumber : numOfPages , activeClass : currentPage === numOfPages}))
    return pageButtons
   }
   
  return (
    <Wrapper>
        <button className='btn prev-btn' onClick={()=>{
            let prevPage = currentPage - 1;
            if(prevPage < 1)prevPage = numOfPages
            handlePageNumber(prevPage)
        }}>
            <HiChevronDoubleLeft />
            Prev
        </button>
        <div className="btn-container">
            {renderPageButtons()}
        </div>
        <button className='btn next-btn'  onClick={()=>{
            let nextPage = currentPage + 1;
            if(nextPage > numOfPages)nextPage = 1
            handlePageNumber(nextPage)
        }}>
            Next
            <HiChevronDoubleRight />  
        </button>

    </Wrapper>
  )
}

export default PageBtnContainerComplex