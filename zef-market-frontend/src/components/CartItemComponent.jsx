import React from 'react'
import { Button, Col, Form, Image, ListGroup , Row } from 'react-bootstrap'

const CartItemComponent = ({item , orderCreated = false }) => {
  return (
<>
  <ListGroup.Item>
  <Row>
    <Col md={2}>
<Image src={item?.image?.path} rounded fluid/>
    </Col>
    <Col md={2}>
{item?.name}
    </Col>
    <Col md={2}>
<b>{item?.price}</b>
    </Col>
    <Col md={3}>
<Form.Select onChange={() => {}} disabled={orderCreated} value={item?.quantity}>
{[...Array(item?.count).keys()].map(coun => 
  <option key={coun} value={coun + 1}>{coun + 1}</option>
)}


</Form.Select>
    </Col>
    <Col md={3}>
<Button type='button' variant='secondary' onClick={() => window.confirm("Are you sure ?")}> <i className="bi bi-trash"></i> </Button>
    </Col>
  </Row>
  </ListGroup.Item>
  <br />
</>
  )
}

export default CartItemComponent