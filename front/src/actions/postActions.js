import axios from 'axios'
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

export const fetchPublicPosts = () => async dispatch => {
  try {
    dispatch({ type: GET_PUBLIC_POSTS_REQUEST })

    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_PUBLIC_POSTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_PUBLIC_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fetchPrivatePosts = userID => async dispatch => {
  try {
    dispatch({ type: GET_PRIVATE_POSTS_REQUEST })

    const res = await axios.get(`/api/posts/${userID}`)

    dispatch({
      type: GET_PRIVATE_POSTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRIVATE_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getPostById = postID => async dispatch => {
  try {
    dispatch({ type: GET_POST_BY_ID_REQUEST })

    const res = await axios.get(`/api/posts/${postID}`)

    dispatch({
      type: GET_POST_BY_ID_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const writePost = (image, text) => async dispatch => {
  try {
    dispatch({ type: WRITE_POST_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const res = await axios.post('/api/posts/', { image, text }, config)

    dispatch({
      type: WRITE_POST_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: WRITE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = post => async dispatch => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const res = await axios.patch(`/api/posts/${post._id}`, post, config)

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePost = postID => async dispatch => {
  try {
    dispatch({ type: DELETE_POST_REQUEST })

    const res = await axios.delete(`/api/posts/${postID}`)

    dispatch({
      type: DELETE_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}