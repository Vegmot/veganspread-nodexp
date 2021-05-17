import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_TOP_COMMENTS_REQUEST,
  GET_TOP_COMMENTS_SUCCESS,
  GET_TOP_COMMENTS_FAIL,
  GET_COMMENT_BY_ID_REQUEST,
  GET_COMMENT_BY_ID_SUCCESS,
  GET_COMMENT_BY_ID_FAIL,
  WRITE_COMMENT_REQUEST,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from '../constants/commentConstants'

const initialState = {
  loading: false,
  comment: null,
  comments: [],
  topComments: [],
  count: 0,
  error: null,
  success: false,
}

export const getCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { ...state, loading: true, comments: [] }
    case GET_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload }
    case GET_COMMENTS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const getTopCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_COMMENTS_REQUEST:
      return { ...state, loading: true, topComments: [] }
    case GET_TOP_COMMENTS_SUCCESS:
      return { ...state, loading: false, topComments: action.payload }
    case GET_TOP_COMMENTS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const getCommentByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_BY_ID_REQUEST:
      return { ...state, loading: true, comment: {} }
    case GET_COMMENT_BY_ID_SUCCESS:
      return { ...state, comment: action.payload }
    case GET_COMMENT_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const writeCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_COMMENT_REQUEST:
      return { ...state, loading: true }
    case WRITE_COMMENT_SUCCESS:
      return { ...state, comment: action.payload }
    case WRITE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return { ...state, loading: true, comment: {} }
    case UPDATE_COMMENT_SUCCESS:
      return { ...state, comment: action.payload }
    case UPDATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true }
    case DELETE_COMMENT_SUCCESS:
      return { ...state, success: true }
    case DELETE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
