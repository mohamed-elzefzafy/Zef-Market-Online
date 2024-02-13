import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

const CART_INITIAL_STATE = {
  cartItems : [],
  itemCount : 0,
  cartSubtotal : 0,

}

export const cartReducer = (state = CART_INITIAL_STATE , action) => {
  switch (action.type) {
    case  ADD_TO_CART : 
    const productBeingAddToCart = action.payLoad;
    const productIsAlreadyExistInState = state.cartItems.find(x =>x._id === productBeingAddToCart._id  )
       
      console.log(productIsAlreadyExistInState);
       const currentState = {...state};
      if (productIsAlreadyExistInState) {
         currentState.itemCount = 0;
         currentState.cartSubtotal = 0;

         currentState.cartItems = state.cartItems.map(x =>  {     
           if (x._id === productIsAlreadyExistInState._id) {
            currentState.itemCount += Number(productBeingAddToCart.quantity);
            const sum = Number(productBeingAddToCart.quantity) * Number(productBeingAddToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemCount += Number(x.quantity);
            const sum  = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }

          return x._id === productIsAlreadyExistInState._id ? productBeingAddToCart : x ;
          }
          )
      }else {
        currentState.itemCount += Number(productBeingAddToCart.quantity);
        const sum = Number(productBeingAddToCart.quantity) * Number(productBeingAddToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems , productBeingAddToCart];

    
      }

    return currentState
    case REMOVE_FROM_CART :
      return {
        ...state ,
        cartItems : state.cartItems.filter(x => x._id !== action.payLoad._id),
        itemCount : state.cartItems - action.payLoad.quantity,
        cartSubtotal : state.cartSubtotal - (action.payLoad.quantity * action.payLoad.price)
      }
    default :
    return state
  }
}