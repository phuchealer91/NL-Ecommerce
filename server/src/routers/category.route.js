const express = require('express')
const router = express.Router()

const {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorCategory } = require('../helpers/Validator')
router.get('/list', getCategories)
router.get('/:slug', getCategory)
router.put('/:slug', validatorCategory(), isAuth, isAdmin, updateCategory)
router.delete('/:slug', validatorCategory(), isAuth, isAdmin, deleteCategory)
router.post('/', validatorCategory(), isAuth, isAdmin, createCategory)

module.exports = router
