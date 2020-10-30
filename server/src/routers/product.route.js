const express = require('express')
const router = express.Router()

const {
  createProduct,
  getListAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require('../controllers/product.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
// const { validatorCategory } = require('../helpers/Validator')
// router.get('/list', getCategories)
// router.get('/:slug', getCategory)
// router.put('/:slug', validatorCategory(), isAuth, isAdmin, updateCategory)
router.get('/:slug', getProduct)
router.get('/list/:count', getListAllProducts)
router.put('/:slug', isAuth, isAdmin, updateProduct)
router.delete('/:slug', isAuth, isAdmin, deleteProduct)
router.post('/', isAuth, isAdmin, createProduct)

module.exports = router
