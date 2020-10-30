const express = require('express')
const router = express.Router()
const authRoute = require('./auth.route')
// const userRoute = require('./user.route')
const categoryRoute = require('./category.route')
const subCategoryRoute = require('./subCategory.route')
const cloudinaryRoute = require('./cloudinary.route')
const productRoute = require('./product.route')

// router.use('/', uploadRoute)
router.use('/v1', cloudinaryRoute)
router.use('/auth', authRoute)
// router.use('/users', userRoute)
router.use('/category', categoryRoute)
router.use('/sub-category', subCategoryRoute)
router.use('/product', productRoute)

module.exports = router
