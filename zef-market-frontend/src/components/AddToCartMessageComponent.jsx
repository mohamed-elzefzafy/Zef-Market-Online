import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const AddToCartMessageComponent = () => {
  const [show, setShow] = useState(true);

    return (
      <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>The Product added To Your Cart!</Alert.Heading>
        <p>
        <Button variant="success" className="me-1">Go Back</Button>
        <Link to="/cart">
        <Button variant="danger">Go To Cart</Button>
        </Link>
    
        </p>
      
      </Alert>
    );

  // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AddToCartMessageComponent;