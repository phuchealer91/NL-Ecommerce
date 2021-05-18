import axiosServices from '../../apis/axiosServices'
import * as types from '../constants/message'
import PATHS from '../constants/paths'

export const addUserMessage =
  ({ user, message }) =>
  (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({
        type: types.ADD_USER,
        payload: { ...user, text: '', medias: [] },
      })
    }
  }

export const addMessages =
  ({ users, msg, socket }) =>
  async (dispatch) => {
    dispatch({
      type: types.ADD_MESSAGE,
      payload: msg,
    })
    try {
      const res = await axiosServices.post(
        `${PATHS.MESSAGE}/create-message`,
        msg
      )
    } catch (error) {
      console.log('Error', error)
    }
  }
export const getConversations =
  ({ user }) =>
  async (dispatch) => {
    console.log('useruseruseruseruseruseruseruseruseruser', user)
    try {
      const res = await axiosServices.get(`${PATHS.MESSAGE}/conversations`)
      let newArr = []
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          console.log('cvcvcvcvcvcvcvcvcv', cv)
          if (cv._id !== user.userDatas._id) {
            newArr.push({ ...cv, text: item.text, medias: item.medias })
          }
        })
      })
      dispatch({
        type: types.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
export const getMessages =
  ({ id }) =>
  async (dispatch) => {
    try {
      const res = await axiosServices.get(`${PATHS.MESSAGE}/messages/${id}`)

      dispatch({
        type: types.GET_MESSAGES,
        payload: res.data,
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
