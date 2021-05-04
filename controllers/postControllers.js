import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const fin = (res, status, message) => {
  return res.status(status).json({ message: message })
}

// write a post
// POST /api/posts
// private
const writePost = asyncHandler(async (req, res) => {
  const { image, text } = req.body

  const user = await User.findById(req.user._id).select('-password')
  if (!user) return fin(res, 400, 'User not found')

  const post = new Post({
    displayName: user.displayName,
    avatar: user.avatar,
    user: req.user._id,
    image,
    text,
  })

  const newPost = await post.save()
  return res.status(201).json(newPost)
})

// get a post
// GET /api/posts/:pid
// public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.pid)
  if (!req.params.pid.match(/^[0-9a-fA-F]{24}$/) || !post)
    return fin(res, 404, 'Post not found')

  return res.status(200).json(post)
})

// update a post
// PUT /api/posts/:pid
// private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.pid)
  if (!req.params.pid.match(/^[0-9a-fA-F]{24}$/) || !post)
    return fin(res, 404, 'Post not found')

  if (post.user.toString() !== req.user._id.toString())
    return fin(res, 403, 'You have no access to this post')

  await Post.findOneAndUpdate(
    { _id: req.params.pid },
    {
      $set: {
        image: req.body.image,
        text: req.body.text,
        editedAt: Date.now(),
      },
    },
    { new: true }
  )

  await post.save()
  return res.status(200).json(post)
})

// remove a post
// DELETE /api/posts/:pid
// private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.pid)
  if (!req.params.pid.match(/^[0-9a-fA-F]{24}$/) || !post)
    return fin(res, 404, 'Post not found')

  if (post.user.toString() !== req.user._id.toString())
    return fin(res, 403, 'You have no access to this post')

  await post.remove()
  return fin(res, 200, 'Successfully removed the post')
})

// get all posts - public only
// GET /api/posts
// public
const getAllPublicPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isPrivate: false })
    .sort({ createdAt: -1 })
    .limit(10)
  if (!posts) return fin(res, 404, 'Posts not found')

  return res.status(200).json(posts) // the latest post goes on top
})

// get logged in user's posts
// GET /api/posts/:uid
// private
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(10)
  if (!posts) return fin(res, 404, 'Posts not found')

  return res.status(200).json(posts)
})

export {
  writePost,
  getPostById,
  updatePost,
  deletePost,
  getAllPublicPosts,
  getMyPosts,
}
