import { toast } from 'react-toastify'
import * as types from '../constants/users'
const initialState = {
  displayName: '',
  email: '',
  token: null,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGIN_IN_USER:
      return { ...state }
    case types.LOGGIN_IN_USER_SUCCESS:
      const { displayName, email, token } = action.payload.data
      return { ...state, displayName, email, token }
    case types.LOGGIN_IN_USER_FAILED:
      toast.error('Login Failed !')
      return { ...state }
    case types.LOGOUT_IN_USER:
      return { ...state, displayName: '', email: '', token: null }
    default:
      return state
  }
}

export default UserReducer
