import { useDispatch, useSelector } from "react-redux";
import UserCartDetailsPageComponent from "./component/UserCartDetailsPageComponent";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import request from "../../utils/request";




const UserCartDetalsPage = () => {
  const {cartItems , itemCount , cartSubtotal} = useSelector(state => state.cart);
  const {userInfo} = useSelector(state => state.userRegisterLogin);

  const dispatch = useDispatch();


  const getUser = async() => {
    const {data} = await request.get("/api/v1/users/profileDetails");
    return data

  }

  const createOrder =  async (orderData) => {
const {data} = await request.post("/api/v1/orders" , {...orderData} );
return data;
  }


  return (
<UserCartDetailsPageComponent cartItems={cartItems} itemCount={itemCount} cartSubtotal={cartSubtotal} 
dispatch={dispatch} addToCart={addToCart} 
removeFromCart={removeFromCart} userInfo={userInfo} getUser={getUser} createOrder={createOrder} />
  )
}

export default UserCartDetalsPage;