import * as types from '../constants/users'
const initialState = {
  loading: false,
  users: [],
  posts: [],
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.GET_USER:
      return { ...state, users: [...state.users, action.payload.user] }

    default:
      return state
  }
}

export default profileReducer
