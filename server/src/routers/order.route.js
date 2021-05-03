const express = require('express')
const router = express.Router()

const {
  getOrders,
  orderStatus,
  getTotalOrders,
  orderStatisticalFilters,
  orderStatisticalByDate,
  getOrdersCompleted,
} = require('../controllers/order.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.get('/list', isAuth, isAdmin, getOrders)
router.get('/list/total', isAuth, isAdmin, getTotalOrders)
router.put('/order-status', isAuth, orderStatus)
router.post('/order-filters', isAuth, orderStatisticalFilters)
router.post('/order-by-date', isAuth, orderStatisticalByDate)
router.get('/order-completed', isAuth, getOrdersCompleted)

module.exports = router
