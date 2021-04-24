const Post = require('../models/post.model')
const User = require('../models/user.model')

module.exports.createPost = async (req, res) => {
  const { content, images } = req.body

  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const newPost = await new Post({
      content,
      images,
      postBy: user._id,
    }).save()
    return res.status(201).json({ posts: newPost })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getPosts = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email,
    }).exec()
    const admins = await User.find({ role: 'admin' }).select('_id').exec()
    const posts = await Post.find({
      $or: [
        { postBy: [...user.following, user._id] },
        { postBy: { $eq: admins[0]._id } },
      ],
    })
      .populate('postBy', 'name photoURL role')
      .sort([['createdAt', 'desc']])
      .exec()
    return res.status(200).json({ posts, result: posts.length })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
