import { call, delay, put, select, takeEvery } from 'redux-saga/effects'
import {
  createProducts,
  deleteProducts,
  getListAllProducts,
  getProduct,
  updateProducts,
  getListProductss,
  getProductsCounts,
  getRelated,
} from '../../apis/product'
import {
  createProductFailed,
  createProductSuccess,
  deleteProductFailed,
  deleteProductSuccess,
  getListAllProductFailed,
  getListAllProductSuccess,
  getProductFailed,
  getProductSuccess,
  updateProductFailed,
  updateProductSuccess,
  getListProductsSuccess,
  getListProductsFailed,
  getProductsCountSuccess,
  getProductsCountFailed,
  getRelatedSuccess,
  getRelatedFailed,
} from '../actions/product'
import { hideLoading, showLoading } from '../actions/ui'
import * as types from '../constants/product'

function* createProductss({ payload }) {
  console.log(payload)
  try {
    yield put(showLoading())
    const resp = yield call(createProducts, payload)
    console.log(resp)
    const { data } = resp
    yield put(createProductSuccess(data))
  } catch (error) {
    yield put(createProductFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
// function* getProductss({ payload }) {
//   try {
//     yield put(showLoading())
//     const resp = yield call(getCategories, payload)
//     const { data } = resp
//     yield put(getCategoriesSuccess(data))
//   } catch (error) {
//     yield put(getCategoriesFailed(error))
//   }
//   yield delay(400)
//   yield put(hideLoading())
// }
function* getProducts({ payload }) {
  try {
    // yield put(showLoading())
    const resp = yield call(getProduct, payload)
    const { data } = resp
    yield put(getProductSuccess(data))
  } catch (error) {
    yield put(getProductFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}

function* deleteProductss({ payload }) {
  try {
    yield put(showLoading())
    yield call(deleteProducts, payload)

    yield put(deleteProductSuccess(payload))
  } catch (error) {
    yield put(deleteProductFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* updateProductss({ payload }) {
  console.log(payload)
  try {
    const product = yield select((state) => state.product.productEditing)
    console.log(product)
    const resp = yield call(updateProducts, product.slug, payload)
    console.log(resp)
    yield put(showLoading())
    const { data } = resp
    yield put(updateProductSuccess(data))
  } catch (error) {
    yield put(updateProductFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

function* getListAllProductss({ payload }) {
  try {
    // yield put(showLoading())
    const resp = yield call(getListAllProducts, payload)
    const { data } = resp
    yield put(getListAllProductSuccess(data))
  } catch (error) {
    yield put(getListAllProductFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}
function* getListProductsss({ payload }) {
  const { sort, order, page } = payload
  try {
    // yield put(showLoading())
    const resp = yield call(getListProductss, { sort, order, page })
    const { data } = resp
    yield put(getListProductsSuccess(data))
  } catch (error) {
    yield put(getListProductsFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}
function* getProductsCountss({ payload }) {
  console.log(payload)
  try {
    // yield put(showLoading())
    const resp = yield call(getProductsCounts, payload)
    console.log(resp)
    const { data } = resp
    yield put(getProductsCountSuccess(data))
  } catch (error) {
    yield put(getProductsCountFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}

function* getRelateds({ payload }) {
  console.log(payload)
  try {
    // yield put(showLoading())
    const resp = yield call(getRelated, payload)
    console.log(resp)
    const { data } = resp
    yield put(getRelatedSuccess(data))
  } catch (error) {
    yield put(getRelatedFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}
export function* watchProduct() {
  yield takeEvery(types.CREATE_PRODUCT, createProductss)
  yield takeEvery(types.GET_ALL_PRODUCT, getListAllProductss)
  yield takeEvery(types.GET_PRODUCTS, getListProductsss)
  yield takeEvery(types.GET_PRODUCT, getProducts)
  yield takeEvery(types.GET_RELATED, getRelateds)
  yield takeEvery(types.GET_PRODUCT_COUNT, getProductsCountss)
  yield takeEvery(types.DELETE_PRODUCT, deleteProductss)
  yield takeEvery(types.UPDATE_PRODUCT, updateProductss)
}
