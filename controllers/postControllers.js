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
  const user = await User.findById(req.user._id)
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
const getPost = asyncHandler(async (req, res) => {
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

  await post.remove()
  return fin(res, 200, 'Successfully removed the post')
})

export { writePost, getPost, updatePost, deletePost }
