import {
  call,
  delay,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { hideLoading, showLoading } from '../actions/ui'

import { TOKEN } from '../constants/keys'
import {
  createCategories,
  deleteCategories,
  getCategories,
  getCategory,
  updateCategories,
} from '../../apis/category'
import * as types from '../constants/category'
import {
  createCategoryFailed,
  createCategorySuccess,
  deleteCategoriesFailed,
  deleteCategoriesSuccess,
  getCategoriesFailed,
  getCategoriesSuccess,
  getCategoryFailed,
  getCategorySuccess,
  updateCategoriesFailed,
  updateCategoriesSuccess,
} from '../actions/category'

function* createCategoryss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(createCategories, payload)
    const { data } = resp
    yield put(createCategorySuccess(data))
  } catch (error) {
    yield put(createCategoryFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* getCategoryss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(getCategories, payload)
    const { data } = resp
    yield put(getCategoriesSuccess(data))
  } catch (error) {
    yield put(getCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* getCategorys({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(getCategory, payload)
    const { data } = resp
    yield put(getCategorySuccess(data))
  } catch (error) {
    yield put(getCategoryFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

function* deleteCategoryss({ payload }) {
  try {
    yield put(showLoading())
    yield call(deleteCategories, payload)

    yield put(deleteCategoriesSuccess(payload))
  } catch (error) {
    yield put(deleteCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* updateCategoryss({ payload }) {
  try {
    const category = yield select((state) => state.category.categoryEditing)
    const resp = yield call(updateCategories, category.slug, payload)
    yield put(showLoading())
    const { data } = resp
    yield put(updateCategoriesSuccess(data))
  } catch (error) {
    yield put(updateCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
export function* watchCategory() {
  yield takeEvery(types.CREATE_CATEGORY, createCategoryss)
  yield takeEvery(types.GET_CATEGORIES, getCategoryss)
  yield takeEvery(types.GET_CATEGORY, getCategorys)
  yield takeEvery(types.DELETE_CATEGORY, deleteCategoryss)
  yield takeEvery(types.UPDATE_CATEGORY, updateCategoryss)
}
