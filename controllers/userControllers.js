import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const fin = (res, status, message) => {
  return res.status(status).json({ message: message })
}

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      avatar: user.avatar,
      email: user.email,
      isPremium: user.isPremium,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    return fin(res, 401, 'Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const imageNumber = Number(await User.countDocuments({})) + 1
  const avatar = `https://i.pravatar.cc/250?img=${imageNumber}`

  const userExists = await User.findOne({ email })

  if (userExists) return fin(res, 400, 'User already exists')

  const user = await User.create({
    firstName:
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
    lastName:
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
    displayName:
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
    email,
    password,
    avatar,
  })

  if (user) {
    return res.status(201).json({
      _id: use._id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    return fin(res, 400, 'Invalid user data')
  }
})

export { authUser, registerUser }
