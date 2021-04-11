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
  addWishList,
  getWishList,
  removeWishList,
  addAddress,
  getAddress,
  removeAddress,
  getAddressSelected,
  applyAddressToCart,
  getTotalOrdersStatus,
  getTotalUsers,
} = require('../controllers/user.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/cart', isAuth, userCart)
router.get('/cart', isAuth, getUserCart)
router.delete('/cart', isAuth, emptyCart)
router.post('/cart/address', isAuth, applyAddressToCart)
// Coupon
router.post('/cart/coupon', isAuth, applyCouponToCart)
// order
router.post('/cart/order', isAuth, createOrder)
router.post('/cart/orders', isAuth, getOrders)
// get total status
router.post('/cart/totals/status', isAuth, getTotalOrdersStatus)

// wishlist
router.post('/wishlist', isAuth, addWishList)
router.post('/wishlists', isAuth, getWishList)
router.put('/wishlist/:productId', isAuth, removeWishList)

// addAddress
router.post('/address', isAuth, addAddress)
router.get('/address', isAuth, getAddress)
router.get('/address/:addressId', isAuth, getAddressSelected)
router.put('/address/:addressId', isAuth, removeAddress)

// get user
router.get('/total', isAuth, isAdmin, getTotalUsers)

module.exports = router
