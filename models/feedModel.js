import mongoose from 'mongoose'

const feedSchema = mongoose.Schema(
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
    isUpdated: {
      type: Boolean,
      default: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Feed = mongoose.model('Feed', feedSchema)

export default Feed
