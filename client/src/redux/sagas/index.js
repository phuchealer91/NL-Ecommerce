import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'
import { watchCategory } from './category'
import { watchSubCategory } from './subCategory'
import { watchProduct } from './product'

function* rootSaga() {
  yield all([
    watchLoggedUser(),
    watchCategory(),
    watchSubCategory(),
    watchProduct(),
  ])
}

export default rootSaga
