import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducer";
import { getCategoriesReducer } from "./reducers/categoryReducer";
import { productsReducer } from "./reducers/productReducer";
import { ordersReducer } from "./reducers/orderReducer";
import { chatReducer } from "./reducers/chatReducer";




const reducer = combineReducers({
  cart : cartReducer ,
  userRegisterLogin : userRegisterLoginReducer,
  getCategories : getCategoriesReducer,
  products : productsReducer,
  orders : ordersReducer,
  chat : chatReducer
})


const initialState = {

  userRegisterLogin : {
    userInfo :localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")) :
     sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
  },

}

const middleWare = [thunk]
const store = createStore(reducer , initialState , composeWithDevTools(
  applyMiddleware(...middleWare)
));

export default store;