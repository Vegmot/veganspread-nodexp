import Comment from '../models/commentModel.js'

export const getCommentById = async cid => {
  const comment = await Comment.findById(cid)
  if (!comment) {
    return null
  }

  return conmment
}

export const getUserComments = async uid => {
  const comments = await Comment.find({ user: uid })
  if (!comments) {
    return null
  }

  return comments
}

export const getLoggedInUserComments = async req => {
  const comments = await Comment.find({ user: req.user._id })
  if (!comments) {
    return null
  }

  return comments
}
