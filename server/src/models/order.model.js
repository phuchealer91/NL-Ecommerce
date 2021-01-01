const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new schema(
  {
    products: [
      {
        product: { type: ObjectId, ref: 'Product' },
        color: String,
        count: Number,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Cash On Delivery',
        'Processing',
        'Dispatched',
        'Cannelled',
        'Completed',
      ],
    },
    orderedBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema, 'order')
module.exports = Order
