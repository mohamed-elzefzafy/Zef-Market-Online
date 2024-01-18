import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";



const reducer = combineReducers({
  cart : counterReducer 
})

const middleWare = [thunk]
const store = createStore(reducer , {cart:{value: 0}} , composeWithDevTools(
  applyMiddleware(...middleWare)
));

export default store;