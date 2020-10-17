const express = require('express')
const router = express.Router()
const {
  createOrUpdateUser,
  login,
  logout,
  isAuth,
  refreshToken,
} = require('../controllers/auth.controller')
// const {
//   validatorRegister,
//   validatorLogin,
// } = require('../middlewares/authValidator')
// const { auth } = require('../middlewares/auth')
router.post('/create-or-update-user', createOrUpdateUser)

// router.post('/register', upload.any(), validatorRegister(), register)
// router.post('/login', validatorLogin(), login)
// router.get('/logout', logout)
// router.get('/refresh-token', refreshToken)
// router.get('/is-auth', auth, isAuth)

module.exports = router
