const express = require('express')
const router = express.Router()
const authRoute = require('./auth.route')
// const userRoute = require('./user.route')
// const categoryRoute = require('./category.route')
// const uploadRoute = require('./upload.route')
// const productRoute = require('./product.route')

// router.use('/', uploadRoute)
router.use('/auth', authRoute)
// router.use('/users', userRoute)
// router.use('/categories', categoryRoute)
// router.use('/products', productRoute)

module.exports = router
