import { GET_FIRST_DATE, GET_SECOND_DATE, GET_USER_ORDERS } from "../constants";

const initialState = {
  alluserOrders: [],
  firstDateOrders : [],
  secondDateOrders : [],

}
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS : 
    return {
      ...state,
      alluserOrders : action.payLoad
    } 
    case GET_FIRST_DATE : 
    return {
      ...state,
      firstDateOrders : action.payLoad
    } 
    case GET_SECOND_DATE : 
    return {
      ...state,
      secondDateOrders : action.payLoad
    } 

    default :
    return state;
  }
}