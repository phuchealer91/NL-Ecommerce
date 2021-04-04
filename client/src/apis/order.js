import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const getTotalOrderss = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/${PATHS.LIST}/total`, data)
}
export const getOrders = (data) => {
  return axiosServices.get(`/${PATHS.ORDER}/${PATHS.LIST}`, data)
}
export const updatedOrderStatus = (orderId, orderStatus) => {
  return axiosServices.put(`/${PATHS.ORDER}/order-status`, {
    orderId,
    orderStatus,
  })
}
