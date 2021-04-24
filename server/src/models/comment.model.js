const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const commentSchema = new schema({}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
