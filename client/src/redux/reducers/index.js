import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
})

export default rootReducer
