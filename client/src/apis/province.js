import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const getProvinces = (data) => {
  return axiosServices.get(`/${PATHS.PROVINCE}/${PATHS.LIST}`, data)
  // return axiosServices.get(`/province/list)
}
export const getProvinceDistrict = (data) => {
  return axiosServices.get(`/${PATHS.PROVINCE}/${PATHS.DISTRICT}/${data}`)
}
