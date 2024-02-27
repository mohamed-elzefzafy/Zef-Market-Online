import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import CartItemComponent from "../../../components/CartItemComponent"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions/userActions";


const OrderDetailsPageComponent = ({getOrder , markAsDeliver , markAsBaid}) => {
  const dispatch = useDispatch();
const [orderDetails, setOrderDetails] = useState();
const [updateDeliver, setUpdateDeliver] = useState(false);
const [updatePaid, setUpdatePaid] = useState(false);
const {id} = useParams();
  useEffect(() => {
getOrder(id).then((order) => setOrderDetails(order)).catch((error) =>
dispatch(logOut()))
},[orderDetails?.isDelivered , id , updateDeliver])

const updateToDeliver =  async (id) => {
await markAsDeliver(id);
setUpdateDeliver(!updateDeliver);
}

const updateToPaid =  async (id) => {
  await markAsBaid(id);
  setUpdatePaid(!updatePaid);
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
        <b>Name :</b> {orderDetails?.user?.name}  {orderDetails?.user?.lastName} <br />
        <b>Address :</b> {orderDetails?.user?.address}<br />
        <b>Phone :</b> {orderDetails?.user?.phoneNumber} <br />
        </Col>
        <Col md={6}>
        <h2>Payment Method</h2>
        <Form.Select value={orderDetails?.paymentMethod} disabled={true}>
          {/* <option value="pp">paybal</option> */}
          <option value="cod">{orderDetails?.paymentMethod}</option>
        </Form.Select>
        </Col>
        <Row>
          <Col md={6}>
            <Alert variant={orderDetails?.isDelivered ? "success" : "danger"}>
            {
              orderDetails?.isDelivered ? `Deliverd at : ${orderDetails?.deliverdAt.substring(0 , 10)}` :" Not Deliverd"
            }
            </Alert>
          </Col>
          <Col md={6}>
          <Alert variant={orderDetails?.isPaid ? "success" : "danger"}>
             {
              orderDetails?.isPaid ? `Paid At : ${orderDetails?.paidAt?.substring(0 , 10)}` : "Not Paid Yet"
             }
  
            </Alert>
          </Col>
        </Row>
      </Row>
    
    <br />
    <h2>Order Items</h2>
    
      <ListGroup variant="flush">
      {orderDetails?.cartItems?.map((item , index) =>
    
    <CartItemComponent key={index} item={item} orderCreated={true} />
    
      ) }
    </ListGroup>
      </Col>
    
      <Col md={4}>
    
    <ListGroup>
      <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
      <ListGroup.Item> Items Price (After Tax) : <span className="fw-bold">{orderDetails?.orderTotal?.cartSubtotal}$</span></ListGroup.Item>
      <ListGroup.Item> Shipping: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item> Tax: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item className="text-danger"> Total Price: <span className="fw-bold">{orderDetails?.orderTotal?.cartSubtotal}$</span></ListGroup.Item>
      <ListGroup.Item >
       <Button onClick={() => updateToDeliver(id)}  disabled={orderDetails?.isDelivered ? true : false} variant="danger" className="w-100">
       {orderDetails?.isDelivered ?  "Order is Finished" : "Mark As Deliverd "   }     
      </Button> 

      <Button onClick={() => updateToPaid(id)}  disabled={orderDetails?.isPaid ? true : false} variant="danger" className="w-100 mt-2">
       {orderDetails?.isPaid ?  "Order is Finished" : "Mark As paid "   }     
      </Button> 
      </ListGroup.Item>
    </ListGroup>
      </Col>
    
      </Row>
    </Container>
  )
}

export default OrderDetailsPageComponent;