import User from '../models/userModel.js'

export const getUserById = async uid => {
  const user = await User.findById(uid)
  if (!user) {
    return null
  }

  return user
}

export const getLoggedInUser = async req => {
  const user = await User.findOne({ id: req.user._id })
  if (!user) {
    return null
  }

  return user
}

export const checkExistingUser = async email => {
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    return null
  }

  return existingUser
}
