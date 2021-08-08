import Post from '../models/postModel.js'

export const getPostById = async pid => {
  const post = await Post.findById(pid)
  if (!post) {
    return null
  }

  return post
}

export const getUserPosts = async uid => {
  const posts = await Post.find({ user: uid })
  if (!posts) {
    return null
  }

  return posts
}

export const getLoggedInUserPosts = async req => {
  const posts = await Post.find({ user: req.user._id })
  if (!posts) {
    return null
  }

  return posts
}
