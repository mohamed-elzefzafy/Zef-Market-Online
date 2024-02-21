import { SET_CHAT_ROOMS } from "../constants"

const initialState = {
  chatRooms : {},
}

export const chatReducer = (state = initialState , action) => {
  switch (action.type) {
    case SET_CHAT_ROOMS : 
    let currentState = {...state};
    if (currentState.chatRooms[action.payLoad.user]) {
      currentState.chatRooms[action.payLoad.user].push({client : action.payLoad.message});
      return {
        ...state,
        chatRooms : {...currentState.chatRooms}
      } 
    } else {
      return {
        ...state,
        chatRooms : {...currentState.chatRooms , [action.payLoad.user] : [{client : action.payLoad.message}]}
      }
    }
  
    default :
    return state;
  }
}

