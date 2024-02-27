import { useDispatch, useSelector } from "react-redux";
import UserCartDetailsPageComponent from "./component/UserCartDetailsPageComponent";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import request from "../../utils/request";
import { useEffect } from "react";
import { createOrder } from "../../redux/actions/orderAction";




const UserCartDetalsPage = () => {

  const {userInfo} = useSelector(state => state.userRegisterLogin);

  const dispatch = useDispatch();


  const getUser = async() => {
    const {data} = await request.get("/api/v1/users/profileDetails");
    return data

  }



  // useEffect(()=>{
  //   dispatch()
  // },[])

  return (
<UserCartDetailsPageComponent 
dispatch={dispatch} addToCart={addToCart} 
removeFromCart={removeFromCart} userInfo={userInfo} getUser={getUser} createOrder={createOrder} />
  )
}

export default UserCartDetalsPage;