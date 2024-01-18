import { Col, Row, Table } from "react-bootstrap"
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const OrdersPageComponent = ({getOrders}) => {
const [orders, setOrders] = useState([]);
  useEffect(() => {
getOrders().then(res => setOrders(res)).catch((error) =>
console.log(
  error.response.data.message ? error.response.data.message : error.response.data)
);
  },[])
  return (
    <Row className="mt-5 w-100">
    <Col md={2}>
<AdminLinksComponent/>
    </Col>
    <Col md={10}>
  <h1>Orders</h1>
  <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Deliverd</th>
            <th>Payment Method</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
    
    {orders?.map((order , index) => 
    <tr>
            <td>{index + 1}</td>
            <td>{order?.user?.name} {order?.user?.lastName}</td>
            <td>{order?.createdAt.substring(0 , 10)}</td>
            <td>{order?.orderTotal?.cartSubtotal}</td>
            <td>
            {order?.isDelivered ? <i className="bi bi-check lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
            </td>
            <td>
              {order?.paymentMethod}
            </td>
            <td>
              <Link to={`/admin/order-details/${order?._id}`}>go to orders</Link>
            </td>
          </tr>
    )}
  
        </tbody>
      </Table>
  
    </Col>
      </Row>
  )
}

export default OrdersPageComponent