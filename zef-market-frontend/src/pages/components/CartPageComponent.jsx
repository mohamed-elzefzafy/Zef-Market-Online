import React from 'react'
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from './../../components/CartItemComponent';
import { LinkContainer } from 'react-router-bootstrap';



const CartPageComponent = ({addToCart , cartDetails  , dispatch , removeFromCart}) => {

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
{cartDetails?.cartItems?.map((item , index) => (
    <CartItemComponent key={index} item={item} changeCount={changeCount} 
    removeFromCartHandler={removeFromCartHandler}/> 
))}
</ListGroup>

{cartDetails?.orderTotal?.carItemsLength === 0 && <Alert variant="info">Your Cart is Empty</Alert>}
    </Col>

    <Col md={4}>
    <ListGroup >
      <ListGroup.Item>  <h3 >Subtotal
       {cartDetails?.orderTotal?.carItemsLength > 0   &&
        <span> {cartDetails?.orderTotal?.carItemsLength} items </span> } </h3> </ListGroup.Item>
      <ListGroup.Item> Price <span className="fw-bold">{cartDetails?.orderTotal?.cartSubtotal}$</span></ListGroup.Item>
      <ListGroup.Item> 
      <LinkContainer to="/user/cart-details">
      <Button type="button" disabled={cartDetails?.orderTotal?.carItemsLength === 0} variant="primary">Proceed To Checkout</Button>
      </LinkContainer>

      </ListGroup.Item>
    </ListGroup>
  
    </Col>
  </Row>
</Container>
  )
}

export default CartPageComponent