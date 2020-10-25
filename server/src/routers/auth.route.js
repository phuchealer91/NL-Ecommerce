const express = require('express')
const router = express.Router()
const {
  createOrUpdateUser,
  currentUser,
} = require('../controllers/auth.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/create-or-update-user', isAuth, createOrUpdateUser)
router.post('/current-user', isAuth, currentUser)
router.post('/current-admin', isAuth, isAdmin, currentUser)

module.exports = router
