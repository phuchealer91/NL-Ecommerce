import PATHS from '../redux/constants/paths'
import axiosServices from './axiosServices'

export const registerOrUpdateUsers = async (data) => {
  return await axiosServices.post(`/${PATHS.AUTH}/create-or-update-user`, data)
}
export const currentUsers = async (data) => {
  return await axiosServices.post(`/${PATHS.AUTH}/current-user`, data)
}
export const currentAdmins = async (data) => {
  return await axiosServices.post(`/${PATHS.AUTH}/current-admin`, data)
}
export const getNotifications = async (data) => {
  return await axiosServices.get(`/${PATHS.AUTH}/get-notifications`, data)
}
export const notificationUpdate = async (data) => {
  return await axiosServices.get(
    `/${PATHS.AUTH}/notification-update-order`,
    data
  )
}
// export const registerOrUpdateUsers = async (authorization) => {
//   return await axios.post(
//     'http://localhost:8000/api/auth/create-or-update-user ',
//     {},
//     {
//       headers: {
//         authorization,
//       },
//     }
//   )
// }
