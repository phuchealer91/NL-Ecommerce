import axiosServices from '../../apis/axiosServices'
import { ImageUpload } from '../../helpers/ImageUpload'
import PATHS from '../constants/paths'
import * as types from '../constants/users'
import { auth } from '../../firebase'
import { loginInUser } from './users'
export const getUsers = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${data}`)
}

export const getProfileUsers = ({ users, id }) => async (dispatch) => {
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({
        type: types.LOADING,
        payload: true,
      })
      const res = await axiosServices.get(`${PATHS.USER}/${id}`)
      dispatch({
        type: types.GET_USER,
        payload: res.data,
      })
      dispatch({
        type: types.LOADING,
        payload: false,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const updateProfileUser = ({ userData, avatar, user }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: types.LOADING,
      payload: true,
    })
    let userx = await auth.currentUser

    let media
    if (avatar) media = await ImageUpload([avatar])
    userx.updateProfile({
      displayName: userData ? userData.name : user.userDatas.name,
      photoURL: avatar ? media[0].url : user.userDatas.photoURL,
    })
    const res = await axiosServices.patch(`${PATHS.USER}/`, {
      ...userData,
      avatar: avatar ? media[0].url : user.userDatas.photoURL,
    })
    const value = {
      ...user,
      userDatas: {
        ...user.userDatas,
        ...userData,
        photoURL: avatar ? media[0].url : user.userDatas.photoURL,
      },
    }
    dispatch(loginInUser(value))
    dispatch({
      type: types.LOADING,
      payload: false,
    })
  } catch (error) {
    console.log('error', error)
  }
}
