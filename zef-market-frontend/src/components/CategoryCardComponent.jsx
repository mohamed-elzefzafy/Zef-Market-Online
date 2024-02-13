import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const CategoryCardComponent = ({category , index}) => {
  return (
    <Card >
    <Card.Img variant="top"  src={category?.image?.url}/>
    <Card.Body>
      <Card.Title>{category?.name}</Card.Title>
      <Card.Text>
        {category?.description}.
      </Card.Text>
      <LinkContainer to={`/product-list/category/${category?._id}`}>
      <Button variant="primary">Go To Category</Button>
      </LinkContainer>
    </Card.Body>
  </Card>
  )
}

export default CategoryCardComponent;