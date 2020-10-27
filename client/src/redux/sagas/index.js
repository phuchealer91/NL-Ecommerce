import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'
import { watchCategory } from './category'
import { watchSubCategory } from './subCategory'

function* rootSaga() {
  yield all([watchLoggedUser(), watchCategory(), watchSubCategory()])
}

export default rootSaga
