import {
  call,
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { hideLoading, showLoading } from '../actions/ui'
import { addToCart, addToCartFailed, addToCartSuccess } from '../actions/cart'

import * as types from '../constants/cart'

function* addToCarts({ payload }) {
  try {
    yield put(addToCartSuccess({ payload }))
  } catch (error) {
    yield put(addToCartFailed(error))
  }
}

export function* watchShoppingCart() {
  yield takeEvery(types.ADD_TO_CART, addToCarts)
}
