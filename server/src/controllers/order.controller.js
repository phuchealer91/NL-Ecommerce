const Order = require('../models/order.model')
const moment = require('moment')
module.exports.getOrders = async (req, res) => {
  try {
    let allOrders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product')
      .exec()
    console.log('hello orrder', allOrders)
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
module.exports.getTotalOrders = async (req, res) => {
  try {
    let totals = await Order.find({}).estimatedDocumentCount().exec()
    return res.status(200).json({ total: totals })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

// current week
const handleCurrentWeek = (req, res) => {
  let currentDate = moment()
  let weekStart = currentDate.clone().startOf('week')
  let weekEnd = currentDate.clone().endOf('week')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(weekStart), $lte: new Date(weekEnd) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// Month ago
const handleMonthAgo = (req, res) => {
  let monthStart = moment().clone().subtract(1, 'months').startOf('month')
  let monthEnd = moment().clone().subtract(1, 'months').endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(monthStart),
            $lte: new Date(monthEnd),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// Current Month
const handleCurrentMonth = (req, res) => {
  let currentDate = moment()
  let monthStart = currentDate.clone().startOf('month')
  // let monthEnd = currentDate.clone().endOf('month')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(monthStart),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
// 365 day
const handleYear365 = (req, res) => {
  let day365 = moment().clone().subtract(365, 'days')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(day365),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

const handleDay7Ago = (req, res) => {
  let day7 = moment().clone().subtract(7, 'days')
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(day7),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.orderStatisticalByDate = async (req, res) => {
  try {
    if (req.body.value === 'day7Ago') {
      await handleDay7Ago(req, res)
    } else if (req.body.value === 'currentWeek') {
      await handleCurrentWeek(req, res)
    } else if (req.body.value === 'monthAgo') {
      await handleMonthAgo(req, res)
    } else if (req.body.value === 'currentMonth') {
      await handleCurrentMonth(req, res)
    } else {
      await handleYear365(req, res)
    }
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}

module.exports.orderStatisticalFilters = (req, res) => {
  const { startDate, endDate } = req.body
  try {
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
          count: { $sum: 1 },
          total: { $sum: '$paymentIntent.amount' },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((orderFilters) => {
        return res.status(200).json({ orderFilters })
      })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
