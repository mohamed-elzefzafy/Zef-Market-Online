import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const AddToCartMessageComponent = ({showCartMessage , setShowCartMessage}) => {
const navigate = useNavigate();

const goBack = () => {
  navigate(-1);
}

    return (
      <Alert show={showCartMessage} variant="success" onClose={() => setShowCartMessage(false)} dismissible>
        <Alert.Heading>The Product added To Your Cart!</Alert.Heading>
        <p>
        <Button variant="success" className="me-1" onClick={goBack}>Go Back</Button>
        <Link to="/cart">
        <Button variant="danger">Go To Cart</Button>
        </Link>
    
        </p>
      
      </Alert>
    );


}

export default AddToCartMessageComponent;