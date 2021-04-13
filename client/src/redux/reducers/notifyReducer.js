import * as types from '../constants/notify'
let initialState = {
  loading: false,
}
const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFY:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export default notifyReducer
