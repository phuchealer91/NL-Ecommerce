const Order = require('../models/order.model')

module.exports.getOrders = async (req, res) => {
  try {
    let allOrders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product')
      .exec()
    return res.status(200).json({ orders: allOrders })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body
  try {
    let updatedOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec()
    return res.status(200).json({ updatedOrderStatus, msg: 'Updated Success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
