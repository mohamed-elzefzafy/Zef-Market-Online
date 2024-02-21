import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({paginationLinksNumber , pageNumber , categoryId , searchQuery}) => {
  const category = categoryId ? `category/${categoryId}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`
  return (
    <Pagination>
    <LinkContainer to={`${url}${pageNumber - 1}`}>
    <Pagination.Prev disabled={pageNumber === 1}/>
    </LinkContainer>
    
  { 
     [...Array(paginationLinksNumber).keys()]?.map((page , index) =>  
     <LinkContainer key={page + 1} to={`${url}${page + 1}`}>
      <Pagination.Item >{page + 1}</Pagination.Item>
      </LinkContainer>
      
     )

  }
     <LinkContainer to={`${url}${pageNumber + 1}`}>
     <Pagination.Next disabled={pageNumber === paginationLinksNumber}/>
     </LinkContainer>

    
    </Pagination>
  );
};

export default PaginationComponent;
