import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  feed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feed',
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
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
