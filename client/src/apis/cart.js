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
export const applyAddressCarts = (data) => {
  return axiosServices.post(
    `/${PATHS.USER}/${PATHS.CART}/${PATHS.ADDRESS}`,
    data
  )
}
export const createOrders = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.CART}/${PATHS.ORDER}`, data)
}
export const userOrders = (data) => {
  return axiosServices.post(
    `/${PATHS.USER}/${PATHS.CART}/${PATHS.ORDERS}`,
    data
  )
}
// status total
export const getTotalOrdersStatuss = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.CART}/totals/status`, data)
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

// api add addresss
export const addAddresss = (data) => {
  return axiosServices.post(`/${PATHS.USER}/${PATHS.ADDRESS}`, data)
}
export const getAddresss = (data) => {
  return axiosServices.get(`/${PATHS.USER}/${PATHS.ADDRESS}`, data)
}
export const removeAddress = (addressId, data) => {
  return axiosServices.put(`/${PATHS.USER}/${PATHS.ADDRESS}/${addressId}`, data)
}

// api get total user
export const getTotalUserss = (data) => {
  return axiosServices.get(`/${PATHS.USER}/total`, data)
}

// Search user name
export const searchUsers = (data) => {
  return axiosServices.get(`/${PATHS.USER}/search?name=${data}`)
}
