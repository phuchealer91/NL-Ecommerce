import * as types from '../constants/stripe'

export const createPaymentItent = (data) => {
  return {
    type: types.CREATE_PAYMENT_ITENT,
    payload: data,
  }
}
export const createPaymentItentSuccess = (data) => {
  return {
    type: types.CREATE_PAYMENT_ITENT_SUCCESS,
    payload: { data },
  }
}
export const createPaymentItentFailed = (error) => {
  return {
    type: types.CREATE_PAYMENT_ITENT_FAILED,
    payload: { error },
  }
}
