import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({index , images}) => {
  return (
    <Card style={{ marginTop : "30px" , marginBottom : "50px" , flexDirection : "row"}}>
    <Row>
      <Col  lg={5}>
      <Card.Img variant="top" src={"/images/" + images[index] + "-category.png"} />
      </Col>

      <Col  lg={7}>
      <Card.Body>
        <Card.Title>Product Name lorem </Card.Title>
        <Card.Text>

        Product decription Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Text >
          <Rating readonly size={20} initialValue={5}/>  <b>(1)</b>
        </Card.Text>
        <Card.Text className="h4">
          150$ {" "}
          <LinkContainer to={`/product-details`}>
          <Button variant="danger">See Product</Button>
          </LinkContainer>
        </Card.Text>      
      </Card.Body>
      </Col>
    </Row>
    

    </Card>
  );
};

export default ProductForListComponent;
