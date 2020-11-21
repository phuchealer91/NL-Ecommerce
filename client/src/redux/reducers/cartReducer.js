import * as types from '../constants/cart'
let initialState = []

if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'))
  } else {
    initialState = []
  }
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return { ...state }
    case types.ADD_TO_CART_SUCCESS:
      return action.payload.data.payload
    default:
      return state
  }
}

export default cartReducer
