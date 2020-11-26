import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'
import { watchCategory } from './category'
import { watchSubCategory } from './subCategory'
import { watchProduct } from './product'
import { watchShoppingCart } from './cart'
import { watchCoupon } from './coupon'

function* rootSaga() {
  yield all([
    watchLoggedUser(),
    watchCategory(),
    watchSubCategory(),
    watchProduct(),
    watchShoppingCart(),
    watchCoupon(),
  ])
}

export default rootSaga
