const subCategories = require('../models/subCategory.model')
const slugify = require('slugify')
var { validationResult } = require('express-validator')
module.exports.createSubCategory = async (req, res) => {
  const { name, parent } = req.body
  const slug = slugify(name).toLowerCase()
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    const subCategoryExists = await subCategories.findOne({ slug })
    if (subCategoryExists)
      return res.status(400).json({ error: 'Sub category already exists' })
    const newSubCategory = new subCategories({
      name,
      parent,
      slug,
    })
    await newSubCategory.save()
    return res.status(201).json({ subCategory: newSubCategory })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getSubCategory = async (req, res) => {
  const { slug } = req.params
  try {
    const subCategory = await subCategories.findOne({ slug }).exec()
    if (!subCategory)
      return res.status(400).json({ error: 'Sub category not found' })
    // get related products
    // const products = await Products.find({category}).populate('categories').exec()
    // return res.status(200).json({ category, products: { data: products } })
    return res.status(200).json({ subCategory })
  } catch (error) {}
}
module.exports.getSubCategories = async (req, res) => {
  try {
    const subCategorys = await subCategories
      .find()
      .sort({ createdAt: -1 })
      .exec()
    if (!subCategorys)
      return res.status(400).json({ error: 'Sub categories not found' })
    return res.status(200).json({ subCategorys })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.updateSubCategory = async (req, res) => {
  const { name, parent } = req.body
  const { slug } = req.params
  const slugUpdate = slugify(name).toLowerCase()
  try {
    const subCategory = await subCategories.findOneAndUpdate(
      { slug: slug },
      { name, parent, slug: slugUpdate },
      { new: true }
    )
    if (!subCategory)
      return res.status(400).json({ error: 'Sub category not found' })
    return res.status(200).json({ subCategory })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.deleteSubCategory = async (req, res) => {
  const { slug } = req.params
  try {
    const subCategoryDeleted = await subCategories.findOneAndDelete({
      slug: slug,
    })
    if (!subCategoryDeleted)
      return res.status(400).json({ error: 'Sub category not found' })
    return res
      .status(200)
      .json({ msg: `Delete ${subCategoryDeleted.name} success` })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
