import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import Comment from '../models/commentModel.js'
import asyncHandler from 'express-async-handler'

// write a comment
// POST /api/comments/:pid
// private
const writeComment = asyncHandler(async (req, res) => {})

// get a comment
// GET /api/comments/:pid/:cid
// private
const getComment = asyncHandler(async (req, res) => {})

// update a comment
// PUT /api/comments/:pid/:cid
// private
const updateComment = asyncHandler(async (req, res) => {})

// delete a comment
// DELETE /api/comments/:pid/:cid
// private
const deleteComment = asyncHandler(async (req, res) => {})

export { writeComment, getComment, updateComment, deleteComment }
