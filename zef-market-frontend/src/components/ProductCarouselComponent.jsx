import {Carousel} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const ProductCarouselComponent = () => {
  return (
    <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
      crossOrigin='anonymous'
      style={{height : "300px" , objectFit : "cover"}}
        className="d-block w-100"
        src="./images/carousel/carousel-1.png"
        alt="First slide"
      />
      <Carousel.Caption>
      <LinkContainer to="/product-details" style={{cursor : "pointer"}}>
      <h3>Best Seller In Laptop Category</h3>
      </LinkContainer>
        
        <p>laptop dell g15 Lorem ipsum dolor, sit amet consectetur  </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        style={{height : "300px" , objectFit : "cover"}}
        className="d-block w-100"
        src="./images/carousel/carousel-2.png"
        alt="Second slide"
      />
      <Carousel.Caption>
      <LinkContainer to="/product-details" style={{cursor : "pointer"}}>
      <h3>Best Seller In books Category</h3>
      </LinkContainer>
        
        <p>laptop dell g15 Lorem ipsum dolor, sit amet consectetur  </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        style={{height : "300px" , objectFit : "cover"}}
        className="d-block w-100"
        src="./images/carousel/carousel-3.png"
        alt="Third slide"
      />
      <Carousel.Caption>
      <LinkContainer to="/product-details" style={{cursor : "pointer"}}>
      <h3>Best Seller In cameras Category</h3>
      </LinkContainer>
        
        <p>laptop dell g15 Lorem ipsum dolor, sit amet consectetur  </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default ProductCarouselComponent;