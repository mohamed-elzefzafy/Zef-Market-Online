import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../components/CartItemComponent";


const CartPage = () => {
  return (
<Container fluid>
<Row className="mt-4">
    <Col md={8}>
<h1>Shopping Cart</h1>

<ListGroup variant="flush">
{Array.from({length : 3}).map((item , index) => (
    <CartItemComponent key={index}/> 
))}
</ListGroup>

<Alert variant="info">Your Cart is Empty</Alert>
    </Col>

    <Col md={4}>
    <ListGroup >
      <ListGroup.Item>  <h3>Subtotal (2) items</h3></ListGroup.Item>
      <ListGroup.Item> Price <span className="fw-bold">300$</span></ListGroup.Item>
      <ListGroup.Item> 
      <LinkContainer to="/user/cart-details">
      <Button type="button" variant="primary">Proceed To Checkout</Button>
      </LinkContainer>

      </ListGroup.Item>
    </ListGroup>
  
    </Col>
  </Row>
</Container>
  )
}

export default CartPage;