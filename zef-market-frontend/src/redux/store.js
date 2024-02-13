import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducer";
import { getCategoriesReducer } from "./reducers/categoryReducer";
import { productsReducer } from "./reducers/productReducer";




const reducer = combineReducers({
  cart : cartReducer ,
  userRegisterLogin : userRegisterLoginReducer,
  getCategories : getCategoriesReducer,
  products : productsReducer
})

const cartLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const initialState = {
  cart : {
    cartItems : cartLocalStorage ,
    itemCount : cartLocalStorage && cartLocalStorage.length > 0 ? cartLocalStorage.reduce((quantity, item) =>  quantity + Number(item.quantity), 0) : 0 ,
    cartSubtotal :cartLocalStorage && cartLocalStorage.length > 0  ? cartLocalStorage.reduce((price , item) => price + Number(item.quantity * item.price) , 0) : 0,
  } , 
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