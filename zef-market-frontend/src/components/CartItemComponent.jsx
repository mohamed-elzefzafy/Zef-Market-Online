import {  Col, Form, Image, ListGroup , Row } from 'react-bootstrap'
import RemoveFromCartComponent from './RemoveFromCartComponent'

const CartItemComponent = ({item , orderCreated = false  , changeCount = false , removeFromCartHandler}) => {
  return (
<>
  <ListGroup.Item>
  <Row>
    <Col md={2}>
<Image src={item?.images[0]?.url} rounded fluid/>
    </Col>
    <Col md={2}>
{item?.name}
    </Col>
    <Col md={2}>
<b>{item?.price}</b>
    </Col>
    <Col md={3}>
<Form.Select onChange={changeCount ? (e) => 
changeCount(item?.productId , e.target.value) : undefined} disabled={orderCreated} value={item?.quantity}>
{[...Array(item?.count).keys()].map(coun => 
  <option key={coun} value={coun + 1}>{coun + 1}</option>
)}


</Form.Select>
    </Col>
    <Col md={3}>
<RemoveFromCartComponent removeFromCartHandler={removeFromCartHandler} 
orderCreated={orderCreated} productId={item?.productId } quantity={item?.quantity} price={item?.price} />
    </Col>
  </Row>
  </ListGroup.Item>
  <br />
</>
  )
}

export default CartItemComponent