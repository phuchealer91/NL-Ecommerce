const express = require('express')
const router = express.Router()
const {
  createPost,
  getPosts,
  updatePost,
} = require('../controllers/post.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, createPost)
router.get('/', isAuth, getPosts)
router.patch('/:id', isAuth, updatePost)

module.exports = router
