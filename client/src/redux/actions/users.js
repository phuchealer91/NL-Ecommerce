import * as userType from '../constants/users'
export const loginInUser = (data) => {
  return {
    type: userType.LOGGIN_IN_USER,
    payload: data,
  }
}
export const loginInUserSuccess = (data) => {
  return {
    type: userType.LOGGIN_IN_USER_SUCCESS,
    payload: { data },
  }
}
export const loginInUserFailed = (error) => {
  return {
    type: userType.LOGGIN_IN_USER_FAILED,
    payload: { error },
  }
}
export const logoutInUser = () => {
  return {
    type: userType.LOGOUT_IN_USER,
  }
}
