import { combineReducers } from 'redux'
import { modalReducer } from '../components/modals/modalReducer'
import {
  getPublicPostsReducer,
  getMyPostsReducer,
  getPostByIdReducer,
  writePostReducer,
  updatePostReducer,
  deletePostReducer,
} from '../reducers/postReducer'
import {
  loginUserReducer,
  registerUserReducer,
  logOutReducer,
  getUserReducer,
  deleteUserReducer,
} from '../reducers/userReducer'
import {
  getCommentsReducer,
  getCommentByIdReducer,
  writeCommentReducer,
  updateCommentReducer,
  deleteCommentReducer,
} from '../reducers/commentReducer'

const rootReducer = combineReducers({
  // modal
  modals: modalReducer,

  // users
  loginUser: loginUserReducer,
  registerUser: registerUserReducer,
  logOut: logOutReducer,
  getUser: getUserReducer,
  deleteUser: deleteUserReducer,

  // posts
  getPublicPosts: getPublicPostsReducer,
  getMyPosts: getMyPostsReducer,
  getPostById: getPostByIdReducer,
  writePost: writePostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,

  // comments
  getComments: getCommentsReducer,
  getCommentById: getCommentByIdReducer,
  writeComment: writeCommentReducer,
  updateComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
})

export default rootReducer
