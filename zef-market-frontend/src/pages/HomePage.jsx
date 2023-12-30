import { Col, Container, Row } from "react-bootstrap";
import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";

const HomePage = () => {

  const categories = ["tablets" , "laptops" , "cameras" , "mobiles" , "Books" , "Clothes"]
  return (
    <>
    <ProductCarouselComponent/>
    <Container>

  
    <Row xs={1} md={2} className="g-4 mt-5">



    {categories.map((category , index) => 
      <CategoryCardComponent category={category} index={index} key={index}/>
    )}
    </Row>
    </Container>
    </>
  )
}

export default HomePage;