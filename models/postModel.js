import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
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
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isAd: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
