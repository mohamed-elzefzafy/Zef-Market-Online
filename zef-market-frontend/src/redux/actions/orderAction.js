import request from "../../utils/request";
import { GET_FIRST_DATE, GET_SECOND_DATE, GET_USER_ORDERS } from "../constants";



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
