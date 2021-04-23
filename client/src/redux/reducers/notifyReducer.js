import * as types from '../constants/notify'

const notifyReducer = (state = null, action) => {
  console.log(action.payload)
  switch (action.type) {
    case types.NOTIFY:
      return action.payload
    default:
      return state
  }
}

export default notifyReducer
