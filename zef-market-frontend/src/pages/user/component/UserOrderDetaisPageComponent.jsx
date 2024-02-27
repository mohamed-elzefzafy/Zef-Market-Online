import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from '../../../components/CartItemComponent'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const UserOrderDetaisPageComponent = ({userInfo , getOrder , loadScript , loadPaypalScript}) => {
  const [order, setOrder] = useState();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [IsPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setorderButtonMessage] = useState("");
  const [isDeliverd, setIsDeliverd] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {id} = useParams();

  useEffect(() => {
    dispatch(getOrder(id)).then(data =>{ 
      setOrder(data);
      if(data?.IsPaid) {
        setorderButtonMessage("your order is finished");
        setButtonDisabled(true);
      } else {
        if (data?.paymentMethod === "paybal") {
          setorderButtonMessage("pay for the order");
        } else if (data?.paymentMethod === "Cash") {
          setButtonDisabled(true);
          setorderButtonMessage("wait for your order pay on Delivery")
        }
      }
    })
  },[id])

const orderHandler = () => {
  setButtonDisabled(true);
  if (order?.paymentMethod === "paybal")
  {
   setorderButtonMessage("to pay for your order click one of the buttons below");
   if (!order?.isPaid) {
   loadPaypalScript(order?.orderTotal?.cartSubtotal , order?.cartItems);
   } else {
    setorderButtonMessage("your order was plceed thank you");
   }
  }
}


  return (
    <Container fluid>
<Row className="mt-4">
  <h1>Order Details</h1>
  <Col md={8}>
  <br />
  <Row>
    <Col md={6}>
    <h2>Shipping</h2>
    <b>Name :</b>{`${userInfo?.name} ${userInfo?.lastName}`}  <br />
    <b>Address :</b> {userInfo?.address}s <br />
    <b>Phone :</b> {userInfo?.phoneNumber} <br />
    </Col>
    <Col md={6}>
    <h2>Payment Method</h2>
    <Form.Select value={order?.paymentMethod} disabled={true}>
    <option value="paybal">paybal</option>
    <option value="Cash">Cash</option>
    </Form.Select>
    </Col>
    <Row>
      <Col md={6}>
        <Alert variant={order?.isDelivered ? "success" : "danger"}>
          {order?.isDelivered ? `Deliverd at ${order?.deliverdAt?.substring(0 , 10)}` : "Not Deliverd"}
        </Alert>
      </Col>
      <Col md={6}>
        <Alert variant={order?.isPaid ? "success" : "danger"}>
        {order?.isPaid ? `Paid at ${order?.paidAt?.substring(0 , 10)}` : "Not Paid"}
        </Alert>
      </Col>
    </Row>
  </Row>

<br />
<h2>Order Items</h2>


  <ListGroup variant="flush">
  {order?.cartItems.map((item , index) =>

<CartItemComponent key={index} item={item} orderCreated={true}/>

  ) }
</ListGroup>



  </Col>

  <Col md={4}>

<ListGroup>
  <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
  <ListGroup.Item> Items Price (After Tax) : <span className="fw-bold">{order?.orderTotal?.cartSubtotal}$</span></ListGroup.Item>
  <ListGroup.Item> Shipping: <span className="fw-bold">Included</span></ListGroup.Item>
  <ListGroup.Item> Tax: <span className="fw-bold">Included</span></ListGroup.Item>
  <ListGroup.Item className="text-danger"> Total Price: <span className="fw-bold">{order?.orderTotal?.cartSubtotal}$</span></ListGroup.Item>
  <ListGroup.Item > 
  <div className='d-grid gap-2'>
  <Button disabled={buttonDisabled} variant="danger" className="w-100" onClick={orderHandler}>
  {orderButtonMessage}
  </Button> 
  </div>
<div style={{position : "relative" , zIndex : "1"}}>   <div id="paybal-container-elements"></div> </div>
  
  </ListGroup.Item>
</ListGroup>
  </Col>

  </Row>
</Container>
  )
}

export default UserOrderDetaisPageComponent