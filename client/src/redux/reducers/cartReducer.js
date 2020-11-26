import * as types from '../constants/cart'
import { toast } from 'react-toastify'
let initialState = {
  cartLists: [],
  isCheckOut: false,
  cartCheckOut: [],
  cartTotals: null,
  addressCart: null,
  isLoading: true,
  isAddAddress: true,
}

if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState.cartLists = JSON.parse(localStorage.getItem('cart'))
  } else {
    initialState.cartLists = []
  }
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return { ...state }

    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartLists: action.payload.data.payload,
        isLoading: false,
      }
    case types.USER_CART_SUCCESS:
      return { ...state, isCheckOut: true, isLoading: false }
    case types.GET_USER_CART_SUCCESS:
      const { products, cartTotal } = action.payload.data
      return {
        ...state,
        cartCheckOut: products,
        cartTotals: cartTotal,
        isLoading: false,
      }
    case types.EMPTY_CART_SUCCESS:
      toast.success('Empty Cart Success !')
      return {
        ...state,
        cartLists: [],
        isCheckOut: false,
        cartCheckOut: [],
        cartTotals: null,
        isLoading: false,
      }
    case types.ADD_ADDRESS_CART_SUCCESS:
      toast.success('Add Address Success !')
      return {
        ...state,
        addressCart: action.payload.data.address,
        isLoading: false,
        isAddAddress: false,
      }
    case types.GET_USER_CART_FAILED:
    case types.ADD_TO_CART_FAILED:
    case types.EMPTY_CART_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default cartReducer
