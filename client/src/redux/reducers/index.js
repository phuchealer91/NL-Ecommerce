import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import couponReducer from './couponReducer'
import stripeReducer from './stripeReducer'
import orderReducer from './orderReducer'
import searchReducer from './searchReducer'
import notifyReducer from './notifyReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
  cart: cartReducer,
  coupon: couponReducer,
  order: orderReducer,
  stripe: stripeReducer,
  search: searchReducer,
  notify: notifyReducer,
  profile: profileReducer,
})

export default rootReducer
