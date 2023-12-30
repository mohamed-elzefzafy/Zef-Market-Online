import { Button, Col, Row, Table } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";


const AdminProductsPage = () => {

  const deleteHandler = () => {
    if (window.confirm('Are you sure ?')) alert("product deleted")
  }
  return (
    <Row className="mt-5 w-100">
    <Col md={2}>
<AdminLinksComponent/>
    </Col>
    <Col md={10}>
  <h1 >Product List
<LinkContainer to="/admin/create-new-product">
<Button variant="primary" className="ms-2">Create New </Button>
</LinkContainer>
  </h1>
  <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
    
    {[{name : "Panasonic" , price : "300$" , category : "Tv"} , 
      {name : "Lenovo" , price : "800$" , category : "Laptop"},
      {name : "Gta" , price : "500$" , category : "Games"} ].map((item , index) => 
    <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>
            <LinkContainer to="/admin/edit-product">
              <Button className="btn-sm">
                <i className="bi bi-pencil-square"></i>
              </Button>
            </LinkContainer>
            {" / "}
            <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
    )}
  
        </tbody>
      </Table>
  
    </Col>
      </Row>
  )
}

export default AdminProductsPage;