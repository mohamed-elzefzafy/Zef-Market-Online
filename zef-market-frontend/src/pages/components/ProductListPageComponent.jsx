import { Button, Col, Container, ListGroup, Row } from "react-bootstrap"
import SortOptionsComponent from "../../components/SortOptionsComponent"
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent"
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent"
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent"
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent"
import ProductForListComponent from "../../components/ProductForListComponent"
import PaginationComponent from "../../components/PaginationComponent"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const ProductListPageComponent = ({getProducts , categories}) => {
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

console.log(attrsFromFilter);
const {categoryId} = useParams();
console.log(filters);

useEffect(() => {
  const oneCategory = categories.find(c => c._id === categoryId);
  setAttrFilter(oneCategory?.attrs)
},[categoryId , categories])


  useEffect(() => {
    getProducts()
    .then(prods => {setProducts(prods.products)
    setLoading(false);
    })
    .catch(err => {console.log(err)
    seterroer(true);
    })
  } , [filters])
  
  const handleFilter = () => {
    setShowResetFilterButton(true);
    setFilters({
      price : price,
      rating : ratingFromFilter,
      categories : CategoriesFromFilter,
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
    <Row>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item className="mb-3 mt-3"><SortOptionsComponent /></ListGroup.Item>
          <ListGroup.Item> FILTER :<br/>  <PriceFilterComponent setPrice={setPrice} price={price}/></ListGroup.Item>
          <ListGroup.Item> <RatingFilterComponent  setRatingFromFilter={setRatingFromFilter}/> </ListGroup.Item>
          <ListGroup.Item>  <CategoryFilterComponent  setCategoriesFromFilter={setCategoriesFromFilter}/></ListGroup.Item>
          <ListGroup.Item>
            <AttributesFilterComponent attrFilter={attrFilter} 
            setAttrsFromFilter={setAttrsFromFilter} attrsFromFilter={attrsFromFilter}/>
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
        description={item?.description} price={item?.price}
         rating={item?.rating} reviewsNumber={item?.reviewsNumber} 
         productId={item?._id}/>
       )
        )}
  
        <PaginationComponent />
      </Col>
    </Row>
  </Container>
  )
}

export default ProductListPageComponent