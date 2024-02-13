import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/actions/userActions';

const ProductsPageComponent = ({fetchProducts , deleteProduct}) => {
  const dispatch = useDispatch();
const [products, setProducts] = useState([]);
const [productDeleted, setProductDeleted] = useState(false);


  const deleteHandler = async(id) => {
    if (window.confirm('Are you sure ?'))  
    {
      const data = await deleteProduct(id)
      if (data === "product deleted successfully") 
      {
        setProductDeleted(!productDeleted);
      }
    }
    
  }

  useEffect(() => {
    fetchProducts().then(res => setProducts(res)).catch((error) =>
  dispatch(logOut())
    );
  },[productDeleted])

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
    
    {products?.map((product , index) => 
    <tr key={product?._id}>
            <td>{index + 1}</td>
            <td>{product?.name}  <Image width="30px" height="30px" className="rounded-circle ms-4" src={product?.images[0]?.url} alt="productPhoto" /> </td>
            <td>{product?.price}</td>
            <td>{product?.category?.name}</td>
            <td>
            <LinkContainer to={`/admin/edit-product/${product?._id}`}>
              <Button className="btn-sm">
                <i className="bi bi-pencil-square"></i>
              </Button>
            </LinkContainer>
            {" / "}
            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product?._id)}>
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

export default ProductsPageComponent;