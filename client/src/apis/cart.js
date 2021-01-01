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
