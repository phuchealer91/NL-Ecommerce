import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const createProducts = (data) => {
  return axiosServices.post(`/${PATHS.PRODUCT}`, data)
}
export const updateProducts = (slug, data) => {
  return axiosServices.put(`/${PATHS.PRODUCT}/${slug}`, data)
}
export const deleteProducts = (slug) => {
  return axiosServices.delete(`/${PATHS.PRODUCT}/${slug}`)
}
// export const getCategories = (data) => {
//   return axiosServices.get(`/${PATHS.CATEGORY}/${PATHS.LIST}`, data)
// }
export const getProduct = (slug, data) => {
  return axiosServices.get(`/${PATHS.PRODUCT}/${slug}`, data)
}
export const getListAllProducts = (count, data) => {
  return axiosServices.get(`/${PATHS.PRODUCT}/${PATHS.LIST}/${count}`, data)
}
