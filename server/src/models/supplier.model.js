const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const supplierSchema = new schema(
  {
    name: { type: String, trim: true, required: true },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    bio: {
      type: String,
    },
    products: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const Supplier = mongoose.model('Supplier', supplierSchema)
module.exports = Supplier
