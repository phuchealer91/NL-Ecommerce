const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Coupon = require('../models/coupon.model')
const Order = require('../models/order.model')
const Log = require('../models/log.model')
const Receipt = require('../models/receipt.model')
const socketIO = require('../../io')
module.exports.userCart = async (req, res) => {
  const { cartLists: cart } = req.body
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
    .populate(
      'products.product',
      '_id title slug price images totalAfterDiscount'
    )
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
  const { coupons } = req.body
  try {
    const validateCoupon = await Coupon.findOne({ name: coupons }).exec()
    if (validateCoupon === null) {
      return res.status(400).json({ Error: 'Invalid Coupon !' })
    }
    const user = await User.findOne({ email: req.user.email }).exec()
    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate('products.product', '_id title price')
      .exec()
    let totalAfterDiscount = Math.round(
      (cartTotal - (cartTotal * validateCoupon.discount) / 100).toFixed(2)
    )
    const updateCart = await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount, applyCoupon: validateCoupon._id },
      { new: true }
    ).exec()
    return res.status(200).json({ totalAfterDiscount: updateCart })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.applyAddressToCart = async (req, res) => {
  const { deliveryAddress } = req.body
  try {
    const user = await User.findOne({ email: req.user.email }).exec()
    const updateCart = await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { deliveryAddress },
      { new: true }
    ).exec()
    return res.status(200).json({ deliveryAddress: updateCart })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body
    const user = await User.findOne({ email: req.user.email }).exec()
    const { products, deliveryAddress, applyCoupon } = await Cart.findOne({
      orderedBy: user._id,
    }).exec()
    const newOrder = await new Order({
      products,
      paymentIntent,
      deliveryAddress,
      applyCoupon: applyCoupon._id,
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
    const userOrder = await User.findById(user._id, 'name email photoURL')
    const io = socketIO.getIO()
    // io.emit('update order', {
    //   orderedBy: userOrder,
    //   newOrder,
    // })
    // TODO: Ghi log
    const log = new Log({
      userId: user._id,
      rootId: newOrder._id,
      type: 'create order',
    })
    await log.save()
    // TODO: push notification
    const orderByUser = await User.findById(
      '5f8f2684bc42094a801edfa6',
      'notifications'
    )
    orderByUser.notifications.newNotifications++
    orderByUser.notifications.list.push({ logId: log })
    await orderByUser.save()

    io.emit('create order', {
      user: userOrder,
      orderId: newOrder._id,
      content: newOrder,
    })
    return res.status(200).json({ order: newOrder })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.getOrders = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  try {
    let user = await User.findOne({ email: req.user.email }).exec()

    let userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .populate('applyCoupon')
      // .skip(skip)
      // .limit(limit)
      .exec()
    return res.status(200).json({ userOrders })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getTotalOrdersStatus = async (req, res) => {
  const { status } = req.body
  try {
    let user = await User.findOne({ email: req.user.email }).exec()

    let totalStatus = await Order.find({
      orderedBy: user._id,
      orderStatus: status,
    })
      .countDocuments()
      .exec()
    return res.status(200).json({ totalStatus })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

// add, update, remove wishlist
module.exports.addWishList = async (req, res) => {
  const { productId } = req.body
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec()

  return res.status(200).json({ user })
}

module.exports.getWishList = async (req, res) => {
  // const { page } = req.body
  // const currentPage = page || 1
  // const perPage = 4
  try {
    const list = await User.findOne({ email: req.user.email })
      .select('wishlist')
      .populate('wishlist')
      // .skip((currentPage - 1) * perPage)
      // .limit(perPage)
      .exec()
    // const wishL = list.limit(4).exec()
    return res.status(200).json({ list })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.removeWishList = async (req, res) => {
  const { productId } = req.params
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
    { new: true }
  ).exec()

  if (!user) return res.status(400).json({ error: 'Không thấy người dùng' })
  return res.status(200).json({ msg: 'Xóa thành công' })
}

module.exports.addAddress = async (req, res) => {
  const { name, phone, mainAddress, fullAddress } = req.body
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      $push: {
        address: {
          name,
          phone,
          mainAddress,
          fullAddress,
        },
      },
    },
    { new: true }
  ).exec()

  if (!userAddress)
    return res.status(400).json({ error: 'Không thấy người dùng' })
  return res.status(200).json({ userAddress })
}
module.exports.getAddress = async (req, res) => {
  try {
    const listUserAddress = await User.findOne({ email: req.user.email })
      .select('address')
      .exec()
    if (!listUserAddress)
      return res.status(400).json({ error: 'Không thấy người dùng' })
    return res.status(200).json({ listUserAddress })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.removeAddress = async (req, res) => {
  const { addressId } = req.params
  const addressDeleted = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { address: { _id: addressId } } },
    { new: true }
  ).exec()

  if (!addressDeleted)
    return res.status(400).json({ error: 'Không thấy người dùng' })
  return res.status(200).json({ msg: 'Xóa thành công' })
}
module.exports.getAddressSelected = async (req, res) => {
  const { addressId } = req.params
  const addressDeleted = await User.findOne({ email: req.user.email })

  if (!addressDeleted)
    return res.status(400).json({ error: 'Không thấy người dùng' })
  return res.status(200).json({ msg: 'Xóa thành công' })
}
module.exports.getTotalUsers = async (req, res) => {
  try {
    let totals = await User.find({}).estimatedDocumentCount().exec()
    return res.status(200).json({ total: totals })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
// search user
module.exports.searchUser = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: 'i' },
    })
      // const users = await User.find({name: /.*f.*/})
      .limit(10)
      .select('name photoURL email')
      .exec()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
// get users
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id })
      .populate('followers following')
      .exec()
    if (!user) return res.status(400).json({ msg: 'Không tìm thấy người dùng' })
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
// update profile user
module.exports.updateUser = async (req, res) => {
  try {
    const { name, mobile, website, story, gender, avatar } = req.body
    const userUpdated = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        name,
        mobile,
        website,
        story,
        gender,
        photoURL: avatar,
      }
    )
    return res.status(200).json({ userUpdated })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.follow = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.user.email }).exec()
    const user = await User.find({
      _id: req.params.id,
      followers: isUser._id,
    }).exec()
    if (user.length > 0)
      return res.status(400).json({ msg: 'Bạn đã theo dõi người dùng này.' })
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followers: isUser._id },
      },
      { new: true }
    )
    await User.findOneAndUpdate(
      { _id: isUser._id },
      {
        $push: { following: req.params.id },
      },
      { new: true }
    )
    return res.status(200).json({ msg: 'Theo dõi thành công' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.unfollow = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.user.email }).exec()
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: isUser._id },
      },
      { new: true }
    )
    await User.findOneAndUpdate(
      { _id: isUser._id },
      {
        $pull: { following: req.params.id },
      },
      { new: true }
    )
    return res.status(200).json({ msg: 'Bỏ theo dõi thành công' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.userReceipt = async (req, res) => {
  const { newReceipt } = req.body
  const receipt = newReceipt.receipts
  let products = []
  let transaction = []
  const user = await User.findOne({ email: req.user.email }).exec()

  // for loop receipt
  for (let i = 0; i < receipt.length; i++) {
    let obj = {}
    obj.product = receipt[i]._id
    obj.inQuatity = receipt[i].inQuatity
    obj.inPrice = receipt[i].inPrice
    products.push(obj)
  }
  transaction.push({
    transaction: newReceipt.receiptPayment,
  })

  let newReceipts = await new Receipt({
    products,
    receiptTotal: newReceipt.receiptTotal,
    supplier: newReceipt.supplier,
    logs: transaction,
    receiptPayment: newReceipt.receiptPayment,
    statusReceipt: newReceipt.statusReceipt,
    orderedBy: user._id,
  }).save()
  return res.status(200).json({ newReceipts })
}

module.exports.getUserReceipt = async (req, res) => {
  const receipts = await Receipt.find()
    .populate(
      'products.product',
      '_id title slug inQuatity inPrice images receiptTotal receiptPayment statusReceipt'
    )
    .populate('supplier')
    .exec()

  return res.status(200).json({ receipts })
}

module.exports.userReceiptAccept = async (req, res) => {
  const { receipt } = req.body
  for (let i = 0; i < receipt.products.length; i++) {
    let quantityId = await Product.findById(receipt.products[i].product._id)
      .select('quantity')
      .exec()
    let total = quantityId.quantity + receipt.products[i].inQuatity
    await Product.findOneAndUpdate(
      { _id: receipt.products[i].product._id },
      { quantity: total, totalQuantity: total },
      { new: true }
    ).exec()
  }

  await Receipt.findOneAndUpdate(
    {
      _id: receipt._id,
    },
    {
      statusReceipt: true,
    },
    { new: true }
  ).exec()
  return res.status(200).json({ msg: 'Cập nhật thành công' })
}
module.exports.userReceiptUpdate = async (req, res) => {
  const { receipt, nextPrice } = req.body

  let totalPrice = receipt.receiptPayment + nextPrice
  await Receipt.findOneAndUpdate(
    {
      _id: receipt._id,
    },
    {
      receiptPayment: totalPrice,
      $push: {
        logs: {
          transaction: nextPrice,
        },
      },
    },
    { new: true }
  ).exec()
  return res.status(200).json({ msg: 'Cập nhật thành công' })
}

module.exports.removeReceipt = async (req, res) => {
  const { _id } = req.body
  try {
    await Receipt.findOneAndRemove({ _id }).exec()
    return res.status(200).json({ msg: 'Delete success' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
