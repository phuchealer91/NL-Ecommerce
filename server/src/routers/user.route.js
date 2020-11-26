const express = require('express')
const router = express.Router()
const {
  userCart,
  getUserCart,
  emptyCart,
  saveUserAddress,
} = require('../controllers/user.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/cart', isAuth, userCart)
router.get('/cart', isAuth, getUserCart)
router.delete('/cart', isAuth, emptyCart)
router.post('/address', isAuth, saveUserAddress)

module.exports = router
