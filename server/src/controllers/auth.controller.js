const User = require('../models/user.model')

module.exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  )
  if (user) {
    res.json(user)
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save()
    res.json(newUser)
  }
}

module.exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) return res.status(400).json({ error: 'User does not exits' })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
