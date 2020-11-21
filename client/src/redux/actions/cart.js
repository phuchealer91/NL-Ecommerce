import * as types from '../constants/cart'
// get category
export const addToCart = (data) => {
  return {
    type: types.ADD_TO_CART,
    payload: data,
  }
}
export const addToCartSuccess = (data) => {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    payload: { data },
  }
}
export const addToCartFailed = (error) => {
  return {
    type: types.ADD_TO_CART_FAILED,
    payload: { error },
  }
}
