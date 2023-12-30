import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";


const AdminOrdersPage = () => {
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
              PayPal
            </td>
            <td>
              <Link to="/admin/order-details">go to orders</Link>
            </td>
          </tr>
    )}
  
        </tbody>
      </Table>
  
    </Col>
      </Row>
  )
}

export default AdminOrdersPage;