import { combineReducers } from 'redux'
import { modalReducer } from '../components/modals/modalReducer'
import {
  getPublicPostsReducer,
  getPrivatePostsReducer,
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
  getPrivatePosts: getPrivatePostsReducer,
  getPostById: getPostByIdReducer,
  writePost: writePostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,

  // comments
})

export default rootReducer
