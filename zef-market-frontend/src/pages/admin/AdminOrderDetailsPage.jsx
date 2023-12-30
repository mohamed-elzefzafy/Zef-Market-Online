import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";


const AdminOrderDetailsPage = () => {
  return (
    <Container fluid>
    <Row className="mt-4">
      <h1>Order Details</h1>
      <Col md={8}>
      <br />
      <Row>
        <Col md={6}>
        <h2>Shipping</h2>
        <b>Name :</b> john doe <br />
        <b>Address :</b> loes Anglos <br />
        <b>Phone :</b> 01144458564 <br />
        </Col>
        <Col md={6}>
        <h2>Payment Method</h2>
        <Form.Select disabled={false}>
          <option value="pp">paybal</option>
          <option value="cod">Cash On Delivery</option>
        </Form.Select>
        </Col>
        <Row>
          <Col md={6}>
            <Alert variant="danger">Not Deliverd</Alert>
          </Col>
          <Col md={6}>
            <Alert variant="success">Paid At 29-12-2023</Alert>
          </Col>
        </Row>
      </Row>
    
    <br />
    <h2>Order Items</h2>
    
      <ListGroup variant="flush">
      {Array.from({length : 3}).map((order , index) =>
    
    <CartItemComponent/>
    
      ) }
    </ListGroup>
      </Col>
    
      <Col md={4}>
    
    <ListGroup>
      <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
      <ListGroup.Item> Items Price (After Tax) : <span className="fw-bold">800$</span></ListGroup.Item>
      <ListGroup.Item> Shipping: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item> Tax: <span className="fw-bold">Included</span></ListGroup.Item>
      <ListGroup.Item className="text-danger"> Total Price: <span className="fw-bold">100$</span></ListGroup.Item>
      <ListGroup.Item > <Button disabled variant="danger" className="w-100">Mark As Deliverd</Button> </ListGroup.Item>
    </ListGroup>
      </Col>
    
      </Row>
    </Container>
  )
}

export default AdminOrderDetailsPage;