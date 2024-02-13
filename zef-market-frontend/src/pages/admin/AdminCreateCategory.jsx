import React from 'react'
import AdminCreateCategoryComponent from './components/AdminCreateCategoryComponent'
import AdminLinksComponent from './../../components/admin/AdminLinksComponent';
import { Col, Row } from 'react-bootstrap';

const AdminCreateCategory = () => {
  return (
<Row className='mt-5 w-100'>
  <Col md={2}>
  <AdminLinksComponent/>
  </Col>
  <Col md={8}>
  <AdminCreateCategoryComponent/>
  </Col>
</Row>

  )
}

export default AdminCreateCategory