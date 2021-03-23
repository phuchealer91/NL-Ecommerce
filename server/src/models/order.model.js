const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new schema(
  {
    products: [
      {
        product: { type: ObjectId, ref: 'Product' },
        count: Number,
      },
    ],
    paymentIntent: {},
    deliveryAddress: {},
    orderStatus: {
      type: String,
      default: 'Tiếp nhận',
      enum: ['Tiếp nhận', 'Đang xử lý', 'Hoàn thành', 'Hủy'],
    },
    orderedBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
