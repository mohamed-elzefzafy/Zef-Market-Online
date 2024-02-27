import { useDispatch, useSelector } from "react-redux";
import CartPageComponent from "./components/CartPageComponent";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";



const CartPage = () => {
  const {cartDetails} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
<CartPageComponent addToCart={addToCart} cartDetails={cartDetails}  dispatch={dispatch}   removeFromCart={removeFromCart}/>
  )
}

export default CartPage;