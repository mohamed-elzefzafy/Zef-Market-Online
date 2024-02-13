import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({index , images  , name , description , price , rating , reviewsNumber , productId}) => {
  return (
    <Card style={{ marginTop : "30px" , marginBottom : "50px" , flexDirection : "row"}}>
    <Row>
      <Col  lg={5}>
      <Card.Img variant="top" style={{objectFit : "scale-down"}} width="300px" height="300px" src={images[0].url} />
      </Col>

      <Col  lg={7}>
      <Card.Body>
        <Card.Title>{name} </Card.Title>
        <Card.Text>

      {description}
        </Card.Text>
        <Card.Text >

          <Rating readonly size={20} initialValue={rating}/> ({reviewsNumber})
        </Card.Text>
        <Card.Text className="h4">
          {price}$ {" "}
          <LinkContainer to={`/product-details/${productId}`}>
          <Link to="/product-details">
          <Button variant="danger">See Product</Button>
          </Link>
        
          </LinkContainer>
        </Card.Text>      
      </Card.Body>
      </Col>
    </Row>
    

    </Card>
  );
};

export default ProductForListComponent;
