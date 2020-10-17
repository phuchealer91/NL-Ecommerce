import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'

function* rootSaga() {
  yield all([watchLoggedUser()])
}

export default rootSaga
