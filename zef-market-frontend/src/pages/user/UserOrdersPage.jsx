import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const UserOrdersPage = () => {
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
  
  {["bi bi-check-lg text-success" , "bi bi-x-lg text-danger"].map((item , index) => 
  <tr>
          <td>{index + 1}</td>
          <td>Mark twin</td>
          <td>28-12-2023</td>
          <td>124$</td>
          <td>
          <i className={item}></i>
          </td>
          <td>
            <Link to="/user/order-details">go to orders</Link>
          </td>
        </tr>
  )}

      </tbody>
    </Table>

  </Col>
    </Row>
  )
}

export default UserOrdersPage;