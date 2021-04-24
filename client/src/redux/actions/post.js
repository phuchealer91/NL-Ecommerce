import axiosServices from '../../apis/axiosServices'
import { ImageUpload } from '../../helpers/ImageUpload'
import PATHS from '../constants/paths'
import * as types from '../constants/post'
import * as GlobalTypes from '../constants/notify'
export const getUsers = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${data}`)
}

export const createPosts = ({ content, images, user }) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } })
    if (images.length > 0) media = await ImageUpload(images)
    const res = await axiosServices.post(`${PATHS.POST}/`, {
      content,
      images: media,
    })
    dispatch({
      type: types.CREATE_POST,
      payload: { ...res.data.posts, postBy: user.userDatas },
    })
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
export const getPostsx = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOADING_POST, payload: true })
    const res = await axiosServices.get(`${PATHS.POST}/`)
    dispatch({ type: types.GET_POSTS, payload: res.data })
    dispatch({ type: types.LOADING_POST, payload: false })
  } catch (error) {
    dispatch({ type: types.LOADING_POST, payload: false })
  }
}
