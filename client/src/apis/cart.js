import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const userCarts = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.CART}`, data)
}
export const addAddressCarts = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.ADDRESS}`, data)
}
export const getUserCarts = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${PATHS.CART}`, data)
}
export const emptyCarts = (data) => {
  return axiosServices.delete(`/${PATHS.USER}/${PATHS.CART}`, data)
}
export const applyCouponCarts = (data) => {
  return axiosServices.post(
    `/${PATHS.USER}/${PATHS.CART}/${PATHS.COUPON}`,
    data
  )
}
export const createOrders = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.CART}/${PATHS.ORDER}`, data)
}
export const userOrders = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${PATHS.CART}/${PATHS.ORDERS}`, data)
}

//api wish list
export const addWishLists = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.WISHLIST}`, data)
}
export const getWishLists = (page) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.WISHLISTS}`, { page })
}
export const removeWishLists = (productId, data) => {
  return axiosServices.put(
    `/${PATHS.USER}/${PATHS.WISHLIST}/${productId}`,
    data
  )
}
