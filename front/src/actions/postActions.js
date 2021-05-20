import axios from 'axios'
import {
  GET_PUBLIC_POSTS_REQUEST,
  GET_PUBLIC_POSTS_SUCCESS,
  GET_PUBLIC_POSTS_FAIL,
  GET_MY_POSTS_REQUEST,
  GET_MY_POSTS_SUCCESS,
  GET_MY_POSTS_FAIL,
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

export const fetchPublicPosts = page => async dispatch => {
  try {
    dispatch({ type: GET_PUBLIC_POSTS_REQUEST })

    const res = await axios.get(`/api/posts?page=${page}`)

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

export const fetchMyPosts = uid => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_POSTS_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    const res = await axios.get(`/api/posts/${uid}`, config)

    dispatch({
      type: GET_MY_POSTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_MY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fetchPostById = pid => async dispatch => {
  try {
    dispatch({ type: GET_POST_BY_ID_REQUEST })

    const res = await axios.get(`/api/posts/${pid}`)

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

export const writePost =
  (image, text, isPrivate = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: WRITE_POST_REQUEST })

      const {
        loginUser: { userData },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post(
        '/api/posts/',
        { image, text, isPrivate },
        config
      )

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

export const updatePost = post => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
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

export const deletePost = pid => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.delete(`/api/posts/${pid}`, config)

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
