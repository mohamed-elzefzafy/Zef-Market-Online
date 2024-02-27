import { MESSAGE_RECIVED, REMOVE_CHAT_ROOM, SET_CHAT_ROOMS, SET_SOCKET } from "../constants"

const initialState = {
  socket : false,
  messageRecieved : false,
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
    case SET_SOCKET :
      return {
        ...state,
        socket : action.payLoad.socket,
      }

      case MESSAGE_RECIVED :
        return {
          ...state,
          messageRecieved : action.payLoad.value,
        }
        case REMOVE_CHAT_ROOM :
      let currentState2 = {...state};
      delete currentState2.chatRooms[action.payLoad.socketId];
      return {
        ...state,
        chatRooms : {...currentState2.chatRooms}
      }
    
    default :
    return state;
  }
}

