import { Col, Container, Row } from "react-bootstrap";


const FooterComponent = () => {
  return (
    <footer >
  <Container fluid>
    <Row className="mt-5">
      <Col className="bg-dark text-white text-center py-2" >copyright &copy; Zef-Market</Col>
    </Row>
  </Container>
    </footer>
  
  )
}

export default FooterComponent;