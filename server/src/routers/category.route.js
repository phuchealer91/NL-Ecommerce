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

router.get('/list', getCategories)
router.get('/:slug', getCategory)
router.put('/:slug', isAuth, isAdmin, updateCategory)
router.delete('/:slug', isAuth, isAdmin, deleteCategory)
router.post('/', isAuth, isAdmin, createCategory)

module.exports = router
