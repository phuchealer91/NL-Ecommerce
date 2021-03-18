const express = require('express')
const router = express.Router()

const {
  createSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/Supplier.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorSupplier } = require('../helpers/Validator')
router.get('/list', getSuppliers)
router.get('/:slug', getSupplier)
router.put('/:slug', validatorSupplier(), isAuth, isAdmin, updateSupplier)
router.delete('/:slug', validatorSupplier(), isAuth, isAdmin, deleteSupplier)
router.post('/', validatorSupplier(), isAuth, isAdmin, createSupplier)

module.exports = router
