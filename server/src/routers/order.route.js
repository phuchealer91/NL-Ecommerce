const express = require('express')
const router = express.Router()

const {
  getOrders,
  orderStatus,
  getTotalOrders,
  orderStatisticalFilters,
  orderStatisticalByDate,
  getOrdersCompleted,
  getTotalPriceDay,
  getTotalPriceWeek,
  getTotalPriceMonth,
  getTotalPriceYear,
  getTotalOrderStatusMonth,
  getTopSellers,
} = require('../controllers/order.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.get('/list', isAuth, isAdmin, getOrders)
router.get('/list/total', isAuth, isAdmin, getTotalOrders)
router.put('/order-status', isAuth, orderStatus)
router.post('/order-filters', isAuth, orderStatisticalFilters)
router.post('/order-by-date', isAuth, orderStatisticalByDate)
router.get('/order-completed', isAuth, getOrdersCompleted)
router.get('/order-price-today', isAuth, getTotalPriceDay)
router.get('/order-price-week', isAuth, getTotalPriceWeek)
router.get('/order-price-month', isAuth, getTotalPriceMonth)
router.get('/order-price-year', isAuth, getTotalPriceYear)
router.get('/order-status-month', isAuth, getTotalOrderStatusMonth)
router.get('/top-sellers', getTopSellers)

module.exports = router
