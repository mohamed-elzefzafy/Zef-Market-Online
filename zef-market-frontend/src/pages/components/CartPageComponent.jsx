import React from 'react'
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from './../../components/CartItemComponent';
import { LinkContainer } from 'react-router-bootstrap';



const CartPageComponent = ({addToCart , cartItems , cartSubtotal , dispatch , removeFromCart}) => {

  const changeCount = (_id , count) => {
 dispatch(addToCart(_id , count))
  }

    const removeFromCartHandler = (_id , quantity , price) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(removeFromCart(_id , quantity , price))
    }
  }
  
  return (
    <Container fluid>
<Row className="mt-4">
    <Col md={8}>
<h1>Shopping Cart</h1>

<ListGroup variant="flush">
{cartItems?.map((item , index) => (
    <CartItemComponent key={index} item={item} changeCount={changeCount} 
    removeFromCartHandler={removeFromCartHandler}/> 
))}
</ListGroup>

{cartItems?.length === 0 && <Alert variant="info">Your Cart is Empty</Alert>}
    </Col>

    <Col md={4}>
    <ListGroup >
      <ListGroup.Item>  <h3 >Subtotal
       { cartItems?.length > 0   &&
        <span> {cartItems?.length} items </span> } </h3> </ListGroup.Item>
      <ListGroup.Item> Price <span className="fw-bold">300$</span></ListGroup.Item>
      <ListGroup.Item> 
      <LinkContainer to="/user/cart-details">
      <Button type="button" disabled={cartItems?.length === 0} variant="primary">Proceed To Checkout</Button>
      </LinkContainer>

      </ListGroup.Item>
    </ListGroup>
  
    </Col>
  </Row>
</Container>
  )
}

export default CartPageComponent