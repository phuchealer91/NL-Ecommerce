const express = require('express')
const router = express.Router()
const { createPost, getPosts } = require('../controllers/post.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, createPost)
router.get('/', isAuth, getPosts)

module.exports = router
