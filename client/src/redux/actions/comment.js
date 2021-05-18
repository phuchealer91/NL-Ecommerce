import axiosServices from '../../apis/axiosServices'
import { ImageUpload } from '../../helpers/ImageUpload'
import PATHS from '../constants/paths'
import * as types from '../constants/post'
import * as GlobalTypes from '../constants/notify'

export const createComments = (post, newComment, user) => async (dispatch) => {
  // const posts = { ...post, comments: [...post.comments, newComment] }
  // dispatch({ type: types.UPDATE_POST, payload: posts })
  try {
    const data = { ...newComment, postId: post._id }
    const res = await axiosServices.post(`${PATHS.COMMENT}/`, data)
    const newData = { ...res.data.comments, postBy: user.userDatas }
    const posts = { ...post, comments: [...post.comments, newData] }
    dispatch({ type: types.UPDATE_POST, payload: posts })
    // dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  } catch (error) {
    dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } })
  }
}
