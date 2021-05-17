import axios from 'axios'
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

export const getComments = pid => async dispatch => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST })

    const res = await axios.get(`/api/comments/${pid}`)

    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTopThreeComments = pid => async dispatch => {
  try {
    dispatch({ type: GET_TOP_COMMENTS_REQUEST })

    const res = await axios.get(`/api/comments/${pid}/top3`)

    dispatch({
      type: GET_TOP_COMMENTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_TOP_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCommentById = (pid, cid) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COMMENT_BY_ID_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    const res = await axios.get(`/api/comments/${pid}/${cid}`, config)

    dispatch({
      type: GET_COMMENT_BY_ID_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_COMMENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const writeComment = (pid, text) => async (dispatch, getState) => {
  try {
    dispatch({ type: WRITE_COMMENT_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`/api/comments/${pid}`, { text }, config)

    dispatch({
      type: WRITE_COMMENT_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: WRITE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateComment =
  (pid, comment, text) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMMENT_REQUEST })

      const {
        loginUser: { userData },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.patch(
        `/api/comments/${pid}/${comment._id}`,
        { text },
        config
      )

      dispatch({
        type: UPDATE_COMMENT_SUCCESS,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteComment = (pid, cid) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.delete(`/api/comments/${pid}/${cid}`, config)

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
