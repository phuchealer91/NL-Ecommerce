const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const userSchema = new schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, default: 'user' },
    cart: { type: Array, default: [] },
    address: [
      {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        mainAddress: { type: String, required: true },
        fullAddress: { type: String, required: true },
      },
    ],
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
