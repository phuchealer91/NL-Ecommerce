const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const userSchema = new schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, default: 'user' },
    cart: { type: Array, default: [] },
    photoURL: {
      type: String,
      default:
        'https://res.cloudinary.com/ecommerce-mp/image/upload/v1617474206/avatar-default_fodabq.png',
    },
    address: [
      {
        name: { type: String, required: true },
        phone: { type: Number, required: true },
        mainAddress: { type: String, required: true },
        fullAddress: { type: String, required: true },
      },
    ],
    wishlist: [{ type: ObjectId, ref: 'Product' }],
    notifications: {
      newNotifications: {
        type: Number,
        default: 0,
      },
      list: [
        {
          hasRead: {
            type: Boolean,
            default: false,
          },
          logId: {
            type: schema.Types.ObjectId,
            ref: 'Log',
          },
        },
      ],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
