import { useDispatch } from "react-redux";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";
import { getOneProduct } from "../redux/actions/productActions";


const ProductDetailsPage = () => {
  const dispatch = useDispatch();


  const getProductDetails = async (id) => {
      await  dispatch(getOneProduct(id));
  }

  return (
<ProductDetailsPageComponent addToCart={addToCart} dispatch={dispatch} getProductDetails={getProductDetails}/>
  );
};

export default ProductDetailsPage;
