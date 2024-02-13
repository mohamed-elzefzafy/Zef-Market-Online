import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import CartItemComponent from './../../../components/CartItemComponent';
import { useEffect, useState } from "react";
import { logOut } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";


const UserCartDetailsPageComponent = ({cartItems , itemCount, cartSubtotal , dispatch , addToCart , 
  removeFromCart , userInfo , getUser , createOrder }) => {
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
const navigate = useNavigate();
  const changeCount = (_id , count) => {
    dispatch(addToCart(_id , count));
  }

  const removeFromCartHandler = (_id , count , price) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(removeFromCart(_id , count , price))
    }
  }


  useEffect(()=> {getUser().then((data) => 
    {
      if (!data?.address || !data?.city || !data?.country || !data?.zipCode || !data?.state || !data?.phoneNumber)
{
  setButtonDisabled(true);
}
    }).catch(() => dispatch(logOut()))
  } ,[userInfo?._id])


  const orderHandler = () => {
    const orderData = {
      cartItems :cartItems.map(item => {
        return {
          name : item.name,
          price : item.price,
          images : item.images,
          quantity : item.quantity,
          count :item.count,
          productId : item._id
        }
      }),
    orderTotal : {
      itemsCount : itemCount,
    cartSubtotal : cartSubtotal
    },
     paymentMethod : paymentMethod
    }

    createOrder(orderData).then(data => {

      navigate(`/user/order-details/${data?._id}`)
    }).catch(error => console.log(error));
    
    }
  
    const choosePaymentMethod = (e) => {
       setPaymentMethod(e.target.value)
    }

  return (
    <Container fluid>
    <Row className="mt-4">
      <h1>Cart Details</h1>
      <Col md={8}>
      <br />
      <Row>
        <Col md={6}>
        <h2>Shipping</h2>
        <b>Name :</b> {`${userInfo?.name} ${userInfo?.lastName}`}  <br />
        <b>Address :</b> {userInfo?.address} <br />
        <b>Phone :</b> {userInfo?.phoneNumber} <br />
        </Col>
        <Col md={6}>
        <h2>Payment Method</h2>
        <Form.Select onChange={choosePaymentMethod} value={paymentMethod}>
          <option value="paybal">paybal</option>
          <option value="Cash">Cash</option>
        </Form.Select>
        </Col>
        <Row>
          <Col md={6}>
            <Alert variant="danger">Not Deliverd {userInfo?.address && userInfo?.city && userInfo?.country && userInfo?.state && userInfo?.phoneNumber ?  "" 
            : "if you want to make order complete your profile and your address"}  </Alert>
          </Col>
          <Col md={6}>
            <Alert variant="success">Not Paid Yet</Alert>
          </Col>
        </Row>
      </Row>
    
    <br />
    <h2>Order Items</h2>
    
    
      <ListGroup variant="flush">
      {cartItems?.map((item , index) =>
    
    <CartItemComponent key={index} item={item} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler}/>
    
      ) }
    </ListGroup>
    
    
    
      </Col>
    
      <Col md={4}>
    
    <ListGroup>
      <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
      <ListGroup.Item> Items Price (After Tax) : <span className="fw-bold">${cartSubtotal}</span></ListGroup.Item>
      <ListGroup.Item> Shipping: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item> Tax: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item className="text-danger">Total price: <span className="fw-bold">${cartSubtotal}</span></ListGroup.Item>
      <ListGroup.Item > <div className="d-grid gap-2">
      <Button onClick={orderHandler} disabled={ButtonDisabled} variant="danger" size="lg" type="button">Place order</Button> 
      </div> </ListGroup.Item>
    </ListGroup>
      </Col>
    
      </Row>
    </Container>
  )
}

export default UserCartDetailsPageComponent