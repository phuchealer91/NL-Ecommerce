const express = require('express')
const router = express.Router()
const {
  userCart,
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCouponToCart,
} = require('../controllers/user.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/cart', isAuth, userCart)
router.get('/cart', isAuth, getUserCart)
router.delete('/cart', isAuth, emptyCart)
router.post('/address', isAuth, saveUserAddress)
// Coupon
router.post('/cart/coupon', isAuth, applyCouponToCart)

module.exports = router
