import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  editedAt: {
    type: Number,
  },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
