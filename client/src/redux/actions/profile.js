import axiosServices from '../../apis/axiosServices'
import PATHS from '../constants/paths'
import * as types from '../constants/users'

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
