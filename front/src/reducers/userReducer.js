import {
  LOG_IN_USER_REQUEST,
  LOG_IN_USER_SUCCESS,
  LOG_IN_USER_FAIL,
  LOG_OUT,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants/userConstants'

const initialState = {
  loading: false,
  user: null,
  userData: null,
  success: false,
  error: null,
}

export const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER_REQUEST:
      return { ...state, loading: true, user: null }
    case LOG_IN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
      }
    case LOG_IN_USER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
      }
    case REGISTER_USER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const logOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {}
    default:
      return state
  }
}

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true, user: {} }
    case GET_USER_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload }
    case GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true }
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, success: true }
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
