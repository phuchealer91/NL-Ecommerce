import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
})

export default rootReducer
