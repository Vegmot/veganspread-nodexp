import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Comment from '../models/commentModel.js'
import asyncHandler from 'express-async-handler'

const done = (res, status, message) => {
  return res.status(status).json({ message: message })
}

// write a comment
// POST /api/comments/:pid
// private
const writeComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return done(res, 404, 'User not found')
  const post = await Post.findById(req.params.pid)
  if (!post) return done(res, 404, 'Post not found')

  const comment = new Comment({
    displayName: user.displayName,
    avatar: user.avatar,
    user: user._id,
    post: post._id,
    text: req.body.text,
  })

  await comment.save()
  res.status(201).json(comment)
})

// get all comments on a post
// GET /api/comments/:pid
// public
const getAllComments = asyncHandler(async (req, res) => {
  const commentsPerLoad = 10
  const page = +req.query.page || 1

  const count = await Comment.countDocuments()

  const comments = await Comment.find({ post: req.params.pid })
    .sort({ createdAt: -1 })
    .limit(commentsPerLoad)
    .skip(commentsPerLoad * (page - 1))

  if (!comments) return res.status(404).json({ message: 'Comments not found' })

  return res
    .status(200)
    .json({ comments, page, pages: Math.ceil(count / commentsPerLoad) })
})

// get a comment
// GET /api/comments/:pid/:cid
// private
const getComment = asyncHandler(async (req, res) => {
  const commentsOnAPost = await Comment.find({ post: req.params.pid })
  const comment = commentsOnAPost.filter(
    cmnt => cmnt._id.toString() === req.params.cid
  )
  if (!comment) return done(res, 404, 'Comment not found')

  return res.status(200).json(comment)
})

// get all comments written by logged in user
// GET /api/comments/:uid
// private
const getAllMyComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ user: req.user._id.toString() })
  if (!comments) return done(res, 404, 'Comment not found')

  return res.status(200).json(comments)
})

// update a comment
// PUT /api/comments/:pid/:cid
// private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOne({
    post: req.params.pid,
    _id: req.params.cid,
  })
  if (!comment) return done(res, 404, 'Comment not found')
  if (comment.user.toString() !== req.user._id.toString())
    return done(res, 403, 'You have no access to this comment')

  await Comment.findOneAndUpdate(
    {
      post: req.params.pid,
      _id: req.params.cid,
    },
    {
      $set: {
        text: req.body.text,
        editedAt: Date.now(),
      },
    },
    { new: true }
  )

  await comment.save()
  return res.status(200).json(comment)
})

// delete a comment
// DELETE /api/comments/:pid/:cid
// private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOne({
    post: req.params.pid,
    _id: req.params.cid,
  })
  if (!comment) return done(res, 404, 'Comment not found')
  if (comment.user.toString() !== req.user._id.toString())
    return done(res, 403, 'You have no access to this comment')

  await comment.remove()
  return done(res, 200, 'Successfully removed the comment')
})

export {
  writeComment,
  getAllComments,
  getComment,
  getAllMyComments,
  updateComment,
  deleteComment,
}
