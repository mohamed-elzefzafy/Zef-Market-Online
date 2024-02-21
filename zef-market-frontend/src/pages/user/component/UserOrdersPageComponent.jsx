import { useEffect, useState } from "react"
import { Col, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserOrders } from "../../../redux/actions/orderAction"


const UserOrdersPageComponent = () => {
  const dispatch = useDispatch();
  const {alluserOrders} = useSelector(state => state.orders);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    dispatch(getUserOrders());
  })
  return (
    <Row className="mt-5">
    <Col md={12}>
  <h1>My Orders</h1>
  <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Deliverd</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
    
    {alluserOrders?.map((order , index) => 
    <tr key={index}>
            <td>{index + 1}</td>
            <td>You</td>
            <td>{order?.createdAt?.substring(0,10)}</td>
            <td>{order?.orderTotal?.cartSubtotal}$</td>
            <td>
            {order?.isDelivered ? <i className="bi bi-check lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
            </td>
            <td>
              <Link to={`/user/order-details/${order?._id}`}>go to orders</Link>
            </td>
          </tr>
    )}
  
        </tbody>
      </Table>
  
    </Col>
      </Row>
  )
}

export default UserOrdersPageComponent