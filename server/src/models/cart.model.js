const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const schema = mongoose.Schema

const cartSchema = new schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
