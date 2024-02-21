import {Carousel} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const ProductCarouselComponent = ({bestSellerProducts}) => {
  return (
    <Carousel data-bs-theme="dark" variant='dark' className='mt-5'>
    {bestSellerProducts?.length > 0 && 
    bestSellerProducts?.map((product) => 
    <Carousel.Item key={product?._id}>
      <img
      crossOrigin='anonymous'
      style={{height : "300px" , width : "300px" , objectFit : "none"}}
        className="d-block w-100"
        src={product?.images[0]?.url}
        alt="First slide"
      />
      <Carousel.Caption >
      <LinkContainer to={`/product-details/${product?._id}`} style={{cursor : "pointer"}}>
      <h3 className='text-danger fw-bold'>Best Seller In {product?.category?.name} Category</h3>
      </LinkContainer>
        
        <p className='text-danger fw-bold'>{product?.description}  </p>
      </Carousel.Caption>
    </Carousel.Item>
    )
    
    }

    {/* <Carousel.Item>
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
    </Carousel.Item> */}
  </Carousel>
  )
}

export default ProductCarouselComponent;