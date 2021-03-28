import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '../front/public/assets/user.png',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumSince: {
      type: Date,
      default: Date.now,
    },
    premiumCancelledAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async enteredPassword => {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async next => {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
