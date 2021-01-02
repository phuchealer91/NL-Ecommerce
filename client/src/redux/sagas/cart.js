import {
  call,
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { hideLoading, showLoading } from '../actions/ui'
import {
  addAddressCartFailed,
  addAddressCartSuccess,
  addToCart,
  emptyCart,
  addToCartFailed,
  addToCartSuccess,
  applyCouponCartFailed,
  applyCouponCartSuccess,
  createOrderFailed,
  createOrderSuccess,
  emptyCartFailed,
  emptyCartSuccess,
  getUserCartFailed,
  getUserCartSuccess,
  userCartFailed,
  userCartSuccess,
  applyCouponCart,
  userOrderFailed,
  userOrderSuccess,
} from '../actions/cart'

import * as types from '../constants/cart'
import {
  addAddressCarts,
  emptyCarts,
  getUserCarts,
  userCarts,
  applyCouponCarts,
  createOrders,
  userOrders,
} from '../../apis/cart'

function* addToCarts({ payload }) {
  try {
    yield put(addToCartSuccess({ payload }))
  } catch (error) {
    yield put(addToCartFailed(error))
  }
}
function* userCartss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(userCarts, payload)
    const { data } = resp
    yield put(userCartSuccess(data))
  } catch (error) {
    yield put(userCartFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* getUserCartss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(getUserCarts, payload)
    const { data } = resp
    yield put(getUserCartSuccess(data))
  } catch (error) {
    yield put(getUserCartFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* emptyCartss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(emptyCarts, payload)
    const { data } = resp
    yield put(emptyCartSuccess(data))
  } catch (error) {
    yield put(emptyCartFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* addAddressCartss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(addAddressCarts, payload)
    const { data } = resp
    yield put(addAddressCartSuccess(data))
  } catch (error) {
    yield put(addAddressCartFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* applyCouponCartss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(applyCouponCarts, payload)
    const { data } = resp
    yield put(applyCouponCartSuccess(data))
  } catch (error) {
    yield put(applyCouponCartFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* createOrderss({ payload }) {
  try {
    yield showLoading()
    const resp = yield call(createOrders, payload)
    if (resp.status === 200) {
      // remove localStorage
      localStorage.removeItem('cart')
      // Empty redux
      // yield put(addToCart([]))
      // yield put(applyCouponCart(''))
      yield put(emptyCart([]))
    }
    const { data } = resp
    yield put(createOrderSuccess(data))
  } catch (error) {
    yield put(createOrderFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}
function* userOrderss({ payload }) {
  try {
    let resp = yield call(userOrders, payload)
    const { data } = resp
    yield put(userOrderSuccess(data))
  } catch (error) {
    yield put(userOrderFailed(error))
  }
  yield delay(400)
  yield hideLoading()
}

export function* watchShoppingCart() {
  yield takeEvery(types.ADD_TO_CART, addToCarts)
  yield takeEvery(types.USER_CART, userCartss)
  yield takeEvery(types.GET_USER_CART, getUserCartss)
  yield takeEvery(types.ADD_ADDRESS_CART, addAddressCartss)
  yield takeEvery(types.EMPTY_CART, emptyCartss)
  yield takeEvery(types.APPLY_COUPON_CART, applyCouponCartss)
  yield takeEvery(types.CREATE_ORDER, createOrderss)
  yield takeEvery(types.USER_ORDER, userOrderss)
}
