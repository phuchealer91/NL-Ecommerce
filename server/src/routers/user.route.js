const express = require('express')
const router = express.Router()
const {
  userCart,
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCouponToCart,
  createOrder,
  getOrders,
} = require('../controllers/user.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/cart', isAuth, userCart)
router.get('/cart', isAuth, getUserCart)
router.delete('/cart', isAuth, emptyCart)
router.post('/address', isAuth, saveUserAddress)
// Coupon
router.post('/cart/coupon', isAuth, applyCouponToCart)
// order
router.post('/cart/order', isAuth, createOrder)
router.get('/cart/orders', isAuth, getOrders)

module.exports = router
