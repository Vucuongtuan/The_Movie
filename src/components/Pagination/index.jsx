import { Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'

function PaginationBS(props) {
    const {totalPages,currentPage,setCurrentPage} = props

    const maxShowPages = 12

    let startPages = Math.max(1,currentPage - Math.floor(maxShowPages / totalPages / 2));
    let endPages = Math.min(totalPages, startPages + maxShowPages - 1);
    
    const startEllipsis = startPages > 1
    const endEllipsis = endPages < totalPages 

const pagesValue = []
for(let i = startPages;i<=endPages;i++) {
 pagesValue.push(
    <Pagination.Item
    key={i}
    active={i === currentPage}
    onClick={() => {
        setCurrentPage(i)
        
    }}
    > {i}
    </Pagination.Item>
 )           
}
    
    return ( 
        <Container >
<Pagination className="">
      <Pagination.First onClick={()=>setCurrentPage(1)}/>
      <Pagination.Prev />
    {startEllipsis && <Pagination.Ellipsis />}
     
        {pagesValue}
     
    {endEllipsis && <Pagination.Ellipsis />}
      <Pagination.Next />
      <Pagination.Last onClick={()=>setCurrentPage(totalPages)}/>
    </Pagination>
        </Container>
     );
}

export default PaginationBS;