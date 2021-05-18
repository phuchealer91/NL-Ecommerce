import * as types from '../constants/message'

const initValue = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
}

const messageReducer = (state = initValue, action) => {
  console.log('message', action.payload)
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      }
    case types.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.sender ||
          user._id === action.payload.recipient
            ? {
                ...user,
                text: action.payload.text,
                medias: action.payload.medias,
              }
            : user
        ),
      }
    case types.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      }
    case types.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultData: action.payload.result,
      }

    default:
      return state
  }
}

export default messageReducer
