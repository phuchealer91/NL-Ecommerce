import { all } from 'redux-saga/effects'
import { watchLoggedUser } from './auth'
import { watchCategory } from './category'
import { watchSubCategory } from './subCategory'
import { watchProduct } from './product'
import { watchShoppingCart } from './cart'
import { watchCoupon } from './coupon'
import { watchCreatePayment } from './stripe'

function* rootSaga() {
  yield all([
    watchLoggedUser(),
    watchCategory(),
    watchSubCategory(),
    watchProduct(),
    watchShoppingCart(),
    watchCoupon(),
    watchCreatePayment(),
  ])
}

export default rootSaga
