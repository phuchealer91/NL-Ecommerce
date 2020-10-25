const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const userSchema = new schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, default: 'user' },
    cart: { type: Array, default: [] },
    address: { type: String, trim: true },
    // wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema, 'users')
module.exports = User
