const express = require('express')
const router = express.Router()
const authRoute = require('./auth.route')
// const userRoute = require('./user.route')
const categoryRoute = require('./category.route')
const subCategoryRoute = require('./subCategory.route')
// const uploadRoute = require('./upload.route')
// const productRoute = require('./product.route')

// router.use('/', uploadRoute)
router.use('/auth', authRoute)
// router.use('/users', userRoute)
router.use('/category', categoryRoute)
router.use('/sub-category', subCategoryRoute)
// router.use('/products', productRoute)

module.exports = router
