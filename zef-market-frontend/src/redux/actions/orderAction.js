import request from "../../utils/request";
import {  ADD_TO_CART, CREATE_ORDER, GET_FIRST_DATE, GET_SECOND_DATE, GET_USER_ORDERS } from "../constants";


    export const createOrder = (paymentMethod) =>  async(dispatch) => {
      try {
        const {data} =  await request.post("/api/v1/orders" , {paymentMethod});
        
        dispatch({
          type : ADD_TO_CART,
          payLoad : data?.deletedCart
        })
        return data?.newOrder;
      } catch (error) {
        console.log(error.response.data);
      }
        }

        export const getOrder = (id) =>  async(dispatch) => {
          try {
            const {data} =  await request.get(`/api/v1/orders/user/${id}`);
            
            dispatch({
              type : CREATE_ORDER,
              payLoad : data
            })
            return data;
          } catch (error) {
            console.log(error.response.data);
          }
            }
          

      
  



export const getUserOrders = () =>  async(dispatch) => {
try {
  const {data} =  await request.get("/api/v1/orders");
  dispatch({
    type : GET_USER_ORDERS,
    payLoad : data
  })
} catch (error) {
  console.log(error.response.data);
}
  }




export const fetchOrdersForFirstDate = (abctrl , firstDateToCompare) => async(dispatch) => {

try {
  const {data} = await request.get(`/api/v1/orders/analysts/${firstDateToCompare}` , {
    signal : abctrl.signal
  });

  let orderSum =0
  const orders = data.map((order) => {
    orderSum += order?.orderTotal?.cartSubtotal;
    var date = new Date(order?.createdAt).toLocaleString("en-US" , {
      hour : "numeric" , hour12 : true ,timeZone : "UTC"});
   return {name : date , [firstDateToCompare] : orderSum}
  })
  dispatch({
    type : GET_FIRST_DATE,
    payLoad : orders
  })
} catch (error) {
  console.log(error.response.data);
}
}
export const fetchOrdersForSecondtDate = (abctrl , secondDateToCompare) => async(dispatch) => {

try {
  const {data} = await request.get(`/api/v1/orders/analysts/${secondDateToCompare}` , {
    signal : abctrl.signal
  });

  let orderSum =0
  const orders = data.map((order) => {
    orderSum += order?.orderTotal?.cartSubtotal;
    var date = new Date(order?.createdAt).toLocaleString("en-US" , {
      hour : "numeric" , hour12 : true ,timeZone : "UTC"});
   return {name : date , [secondDateToCompare] : orderSum}
  })
  dispatch({
    type : GET_SECOND_DATE,
    payLoad : orders
  })
} catch (error) {
  console.log(error.response.data);
}
}
