const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const authorSchema = new schema(
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

const Author = mongoose.model('Author', authorSchema)
module.exports = Author
