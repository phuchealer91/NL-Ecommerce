import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as types from './redux/constants/message'

SocketClient.propTypes = {}

function SocketClient(props) {
  const { user, socket } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user.token) {
      socket.emit('joinUsers', user.userDatas)
    }
  }, [socket, user.userDatas._id])
  useEffect(() => {
    if (user.token) {
      socket.on('addMessageToClient', (msg) => {
        dispatch({
          type: types.ADD_MESSAGE,
          payload: msg,
        })
        dispatch({
          type: types.ADD_USER,
          payload: { ...msg.user, text: msg.text, medias: msg.medias },
        })
      })
    }
  }, [socket, dispatch])
  return <div></div>
}

export default SocketClient
