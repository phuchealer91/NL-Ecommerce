import { toast } from 'react-toastify'
import * as types from '../constants/users'
const initialState = {
  name: '',
  email: '',
  token: null,
  role: '',
  _id: '',
  isAdmin: false,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_OR_UPDATE_USER:
    case types.CURRENT_USER:
      return { ...state }
    case types.LOGGIN_IN_USER_SUCCESS:
    case types.CURRENT_USER_SUCCESS:
    case types.CREATE_OR_UPDATE_USER_SUCCESS:
      const { email, token, name, role, _id } = action.payload.data
      return { ...state, email, token, name, role, _id }
    case types.CURRENT_ADMIN_SUCCESS:
      return { ...state, isAdmin: true }
    case types.LOGGIN_IN_USER_FAILED:
    case types.CREATE_OR_UPDATE_USER_FAILED:
    case types.CURRENT_USER_FAILED:
    case types.CURRENT_ADMIN_FAILED:
      toast.error('Login Failed !')
      return { ...state }
    case types.LOGOUT_IN_USER:
      return { ...state, name: '', email: '', token: null, role: '', _id: '' }
    default:
      return state
  }
}

export default UserReducer
