import { Button, Col, Container, ListGroup, Row } from "react-bootstrap"
import SortOptionsComponent from "../../components/SortOptionsComponent"
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent"
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent"
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent"
import ProductForListComponent from "../../components/ProductForListComponent"
import PaginationComponent from "../../components/PaginationComponent"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsAction } from './../../redux/actions/productActions';


const ProductListPageComponent = ({getProducts , categories , proceedFilters}) => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [erroer, seterroer] = useState(false);
const [attrFilter, setAttrFilter] = useState([]);
const [attrsFromFilter, setAttrsFromFilter] = useState([]);
const [showResetFilterButton, setShowResetFilterButton] = useState(false);
const [filters, setFilters] = useState({});
const [price, setPrice] = useState(500);
const [ratingFromFilter, setRatingFromFilter] = useState({});
const [CategoriesFromFilter, setCategoriesFromFilter] = useState({});
const [choosenCategory, setChoosenCategory] = useState({});
const [sortOption, setSortOption] = useState("");
const [paginationLinksNumber, setpaginationLinksNumber] = useState(null);
const [pageNumber, setpageNumber] = useState(null);

// const dispatch = useDispatch()
const navigate = useNavigate();
const {categoryId} = useParams() || "";
const {pageNumParam} = useParams() || 1;
const {searchQuery} = useParams() || "";

useEffect(() => {
  const oneCategory = categories.find(c => c._id === categoryId);
  setChoosenCategory(oneCategory)
  setAttrFilter(oneCategory?.attrs)
},[categoryId , categories])


// const {allProducts} = useSelector(state => state.products);
// useEffect(() => {
// dispatch(getAllProductsAction(categoryId, pageNumParam , searchQuery , filters , sortOption));
// },[])



  useEffect(() => {
    getProducts(categoryId, pageNumParam , searchQuery , filters , sortOption)
    .then(prods => {
      console.log(pageNumParam);
      setProducts(prods?.products);
      setpaginationLinksNumber(prods?.pageLinksNumber);
      setpageNumber(prods?.pageNum);
      console.log(proceedFilters(filters));;
    setLoading(false);
    })
    .catch(err => {console.log(err)
    seterroer(true);
    })
  } , [categoryId, pageNumParam , searchQuery , filters , sortOption])
  
  const handleFilter = () => {
    navigate(window.location.pathname?.replace(/\/[0-9]$/ , ""))
    setShowResetFilterButton(true);
    setFilters({
      price : price,
      rating : ratingFromFilter,
      category : CategoriesFromFilter,
      attrs : attrsFromFilter,
    })
  }
console.log(filters);

  const resetFilter = () => {
    setShowResetFilterButton(false);
    setFilters({});
    window.location.href = "/product-list"
  }
  return (
    <Container fluid>
    {
      categoryId ? (
        <h2 className="mt-5 mb-2 text-center">Products for Category <span className="text-danger">{choosenCategory?.name}</span></h2>
      ): (
        <h2 className="mt-5 mb-2 text-center">All Products list</h2>
      )
    }
    <Row>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item className="mb-3 mt-3"><SortOptionsComponent setSortOption={setSortOption}/></ListGroup.Item>
          <ListGroup.Item> FILTER :<br/>  <PriceFilterComponent setPrice={setPrice} price={price}/></ListGroup.Item>
          <ListGroup.Item> <RatingFilterComponent  setRatingFromFilter={setRatingFromFilter}/> </ListGroup.Item>
          <ListGroup.Item>  <CategoryFilterComponent setAttrFilter={setAttrFilter} 
          choosenCategory={choosenCategory} categoryId={categoryId}
           setCategoriesFromFilter={setCategoriesFromFilter}
            attrFilter={attrFilter} setAttrsFromFilter={setAttrsFromFilter} attrsFromFilter={attrsFromFilter}
           /></ListGroup.Item>
          <ListGroup.Item>
        {/* ljkhghjghjgh */}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary" className="me-1" onClick={handleFilter}>Filter</Button>
          {
            showResetFilterButton &&
            <Button variant="danger" onClick={resetFilter}>Reset filter</Button>
          }
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={9}>
      {loading ? (<h1>Loading ...</h1>) : erroer ? (
        <h1>Error While loading products try again</h1>
      ) : (    products?.map((item , index) =>
      <ProductForListComponent
       key={item?._id}  images={item?.images} name={item?.name}
       reviewsLength={item?.reviews?.length}
        description={item?.description} price={item?.price}
         rating={item?.rating} reviewsNumber={item?.reviewsNumber} 
         productId={item?._id}/>
       )
        )}
  
    {paginationLinksNumber > 1 &&
      <PaginationComponent
       paginationLinksNumber={paginationLinksNumber}  pageNumber={pageNumber} 
       categoryId={categoryId} searchQuery={searchQuery}
       />
    }
      </Col>
    </Row>
  </Container>
  )
}

export default ProductListPageComponent