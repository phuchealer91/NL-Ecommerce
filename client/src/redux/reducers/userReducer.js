import { toast } from 'react-toastify'
import * as types from '../constants/users'
const initialState = {
  userDatas: [],
  name: '',
  email: '',
  photoURL: '',
  notificationsCount: 0,
  token: null,
  role: '',
  _id: '',
  isAdmin: false,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_OR_UPDATE_USER:
    case types.NOTIFICATION_ORDER:
      console.log(
        'NOTIFICATION_ORDERNOTIFICATION_ORDERNOTIFICATION_ORDER',
        action.payload
      )
      return {
        ...state,
        notificationsCount: action.payload.count,
      }
    // return {...state,notificationsCount: action.payload}
    case types.CURRENT_USER:
      return { ...state }
    case types.LOGGIN_IN_USER_SUCCESS:
    case types.CURRENT_USER_SUCCESS:
    case types.NOTIFICATION_ORDER_SUCCESS:
    case types.CREATE_OR_UPDATE_USER_SUCCESS:
      const {
        email,
        token,
        name,
        role,
        _id,
        notifications,
      } = action.payload.data
      return {
        ...state,
        email,
        token,
        name,
        role,
        _id,
        notificationsCount: notifications.newNotifications,
        userDatas: action.payload.data,
      }
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
