import * as types from '../constants/product'

export const createProduct = (data) => {
  return {
    type: types.CREATE_PRODUCT,
    payload: data,
  }
}
export const createProductSuccess = (data) => {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const createProductFailed = (error) => {
  return {
    type: types.CREATE_PRODUCT_FAILED,
    payload: { error },
  }
}
// GET PRODUCT
export const getProduct = (data) => {
  return {
    type: types.GET_PRODUCT,
    payload: data,
  }
}
export const getProductSuccess = (data) => {
  return {
    type: types.GET_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const getProductFailed = (error) => {
  return {
    type: types.GET_PRODUCT_FAILED,
    payload: { error },
  }
}
// GET LIST ALL
export const getListAllProduct = (data) => {
  return {
    type: types.GET_ALL_PRODUCT,
    payload: data,
  }
}
export const getListAllProductSuccess = (data) => {
  return {
    type: types.GET_ALL_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const getListAllProductFailed = (error) => {
  return {
    type: types.GET_ALL_PRODUCT_FAILED,
    payload: { error },
  }
}
// UPDATE PRODUCT
export const updateProduct = (data) => {
  return {
    type: types.UPDATE_PRODUCT,
    payload: data,
  }
}
export const updateProductSuccess = (data) => {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const updateProductFailed = (error) => {
  return {
    type: types.UPDATE_PRODUCT_FAILED,
    payload: { error },
  }
}
// DELETE PRODUCT
export const deleteProduct = (data) => {
  return {
    type: types.DELETE_PRODUCT,
    payload: data,
  }
}
export const deleteProductSuccess = (data) => {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: { data },
  }
}
export const deleteProductFailed = (error) => {
  return {
    type: types.DELETE_PRODUCT_FAILED,
    payload: { error },
  }
}
