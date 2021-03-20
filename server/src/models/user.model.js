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
        name: { type: String },
        phone: { type: Number, required: true },
        district: { type: String },
        province: { type: String },
        ward: { type: String },
        addressFull: { type: String },
      },
    ],
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
