import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
})

export default rootReducer
