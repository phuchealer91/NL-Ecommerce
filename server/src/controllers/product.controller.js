const Product = require('../models/product.model')
const slugify = require('slugify')
module.exports.createProduct = async (req, res) => {
  console.log(req.body)
  try {
    req.body.slug = slugify(req.body.title)
    const newProduct = new Product(req.body)
    await newProduct.save()
    return res.status(201).json({ product: newProduct })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getListAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']])
      .exec()
    if (!products) return res.status(400).json({ error: 'Products not found' })
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subs')
      .exec()
    if (!product) return res.status(400).json({ error: 'Product not found' })
    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const productUpdated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec()
    if (!productUpdated)
      return res.status(400).json({ error: 'Update product failed' })
    return res.status(200).json({ product: productUpdated })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec()
    return res.status(200).json({ deleted })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
