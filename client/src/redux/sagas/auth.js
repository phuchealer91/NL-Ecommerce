import { call, delay, put, take, takeEvery } from 'redux-saga/effects'
import { hideLoading, showLoading } from '../actions/ui'
import { loginInUserFailed, loginInUserSuccess } from '../actions/users'
import * as userType from '../constants/users'

export function* watchLoggedUser() {
  yield put(showLoading())
  while (true) {
    try {
      const resp = yield take(userType.LOGGIN_IN_USER)
      const { payload } = resp
      yield put(loginInUserSuccess(payload))
    } catch (error) {
      yield put(loginInUserFailed(error))
    }
    yield delay(400)
    yield put(hideLoading())
  }
}
// function* flogout() {
//   localStorage.removeItem(TOKEN)
// }
// export function* watchLogout() {
//   yield takeEvery(userType.LOGOUT_IN_USER, flogout)
// }
// export function* watchLogin() {
//   // types.LOGIN gọi từ bên actions vì
//   // actions có types.LOGIN từ bên actionType
//   yield takeEvery(types.LOGIN, flogin)
// }
