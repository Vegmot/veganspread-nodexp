import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const fin = (res, status, message) => {
  return res.status(status).json({ message: message })
}

// authenticate (login) user
// POST /api/users/login
// public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user || !(await user.matchPassword(password)))
    return fin(res, 401, 'Invalid email or password')

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
})

// register user
// POST /api/users/register
// public
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

  if (!user) return fin(res, 400, 'Invalid user data')

  return res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

// get a user by its id
// GET /api/users/:uid
// private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) return fin(res, 404, 'User not found')

  return res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    isPremium: user.isPremium,
  })
})

// delete user
// DELETE /api/users/:uid
// private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) return fin(res, 404, 'User not found')

  await user.remove()
  return fin(res, 200, 'Successfully deleted the user')
})

export { authUser, registerUser, getUser, deleteUser }
