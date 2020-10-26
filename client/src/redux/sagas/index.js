import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'
import { watchCategory } from './category'

function* rootSaga() {
  yield all([watchLoggedUser(), watchCategory()])
}

export default rootSaga
