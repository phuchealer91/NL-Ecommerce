const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Coupon = require('../models/coupon.model')
const Order = require('../models/order.model')

module.exports.userCart = async (req, res) => {
  const { cartLists: cart } = req.body
  console.log(cart)
  let products = []
  // get user currently
  const user = await User.findOne({ email: req.user.email }).exec()
  // check if cart with logged in user id already exist
  let cartExistByUser = await Cart.findOne({ orderedBy: user._id }).exec()
  if (cartExistByUser) {
    cartExistByUser.remove()
  }
  // for loop cart
  for (let i = 0; i < cart.length; i++) {
    let obj = {}
    obj.product = cart[i]._id
    obj.count = cart[i].count
    obj.color = cart[i].color
    // Get price tu db tránh trường hợp sửa ở local (ko bảo mật)
    let productById = await Product.findById(cart[i]._id).select('price').exec()
    obj.price = productById.price
    products.push(obj)
  }
  let cartTotal = 0
  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count
  }
  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save()
  return res.status(200).json({ newCart })
}

module.exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()
  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec()
  const { products, cartTotal, totalAfterDiscount } = cart

  return res.status(200).json({ products, cartTotal, totalAfterDiscount })
}

module.exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()
  await Cart.findOneAndRemove({ orderedBy: user._id }).exec()
  return res.status(200).json({ msg: 'Delete success' })
}

module.exports.saveUserAddress = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    ).exec()
    return res.status(200).json({ msg: 'Update Address Success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.applyCouponToCart = async (req, res) => {
  const { coupon } = req.body
  try {
    const validateCoupon = await Coupon.findOne({ name: coupon }).exec()
    if (validateCoupon === null) {
      return res.status(400).json({ Error: 'Invalid Coupon !' })
    }
    const user = await User.findOne({ email: req.user.email }).exec()
    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate('products.product', '_id title price')
      .exec()
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validateCoupon.discount) / 100
    ).toFixed(2)
    const updateCart = await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec()
    return res.status(200).json({ totalAfterDiscount: updateCart })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body
    console.log('hello em', paymentIntent)
    const user = await User.findOne({ email: req.user.email }).exec()
    const { products } = await Cart.findOne({ orderedBy: user._id }).exec()
    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save()
    // increment sold, decrement quantity
    let bulk = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      }
    })
    // SD bulkWrite (Thực hiện nhiều thao tác)
    await Product.bulkWrite(bulk, {})
    return res.status(200).json({ order: newOrder })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.getOrders = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email }).exec()
    let userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .exec()
    return res.status(200).json({ userOrders })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
