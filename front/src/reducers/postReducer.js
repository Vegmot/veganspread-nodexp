import {
  GET_PUBLIC_POSTS_REQUEST,
  GET_PUBLIC_POSTS_SUCCESS,
  GET_PUBLIC_POSTS_FAIL,
  GET_PRIVATE_POSTS_REQUEST,
  GET_PRIVATE_POSTS_SUCCESS,
  GET_PRIVATE_POSTS_FAIL,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAIL,
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
} from '../constants/postConstants'

const initialState = {
  loading: false,
  success: false,
  post: null,
  posts: [],
  error: null,
}

export const getPublicPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLIC_POSTS_REQUEST:
      return { ...state, loading: true, posts: [] }

    case GET_PUBLIC_POSTS_SUCCESS:
      return { ...state, loading: false, success: true, posts: action.payload }

    case GET_PUBLIC_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export const getPrivatePostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIVATE_POSTS_REQUEST:
      return { ...state, loading: true, posts: [] }

    case GET_PRIVATE_POSTS_SUCCESS:
      return { ...state, loading: false, success: true, posts: action.payload }

    case GET_PRIVATE_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export const getPostByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_BY_ID_REQUEST:
      return { ...state, loading: true, post: {} }

    case GET_POST_BY_ID_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload }

    case GET_POST_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export const writePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_POST_REQUEST:
      return { ...state, loading: true }

    case WRITE_POST_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload }

    case WRITE_POST_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export const updatePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { ...state, loading: true, post: {} }

    case UPDATE_POST_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload }

    case UPDATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export const deletePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { ...state, loading: true }

    case DELETE_POST_SUCCESS:
      return { ...state, loading: false, success: true }

    case DELETE_POST_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
