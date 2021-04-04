const express = require('express')
const router = express.Router()

const {
  getOrders,
  orderStatus,
  getTotalOrders,
} = require('../controllers/order.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.get('/list', isAuth, isAdmin, getOrders)
router.get('/list/total', isAuth, isAdmin, getTotalOrders)
router.put('/order-status', isAuth, orderStatus)

module.exports = router
