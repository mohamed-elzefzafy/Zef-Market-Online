import { useDispatch, useSelector } from "react-redux";
import CartPageComponent from "./components/CartPageComponent";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";



const CartPage = () => {
  const {cartItems , cartSubtotal} = useSelector(state => state.cart)
  const dispatch = useDispatch();
  return (
<CartPageComponent addToCart={addToCart} cartItems={cartItems} cartSubtotal={cartSubtotal} dispatch={dispatch}   removeFromCart={removeFromCart}/>
  )
}

export default CartPage;