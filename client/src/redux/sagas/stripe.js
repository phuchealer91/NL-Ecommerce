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
  createPaymentItentFailed,
  createPaymentItentSuccess,
} from '../actions/stripe'
import { TOKEN } from '../constants/keys'
import { createPaymentIntents } from '../../apis/stripe'
import * as types from '../constants/stripe'

function* createPaymentItentss({ payload }) {
  try {
    // yield put(showLoading())
    const resp = yield call(createPaymentIntents, payload)
    const { data } = resp
    yield put(createPaymentItentSuccess(data))
  } catch (error) {
    yield put(createPaymentItentFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}

export function* watchCreatePayment() {
  yield takeEvery(types.CREATE_PAYMENT_ITENT, createPaymentItentss)
}
