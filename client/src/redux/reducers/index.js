import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
  cart: cartReducer,
})

export default rootReducer
