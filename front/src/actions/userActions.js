import axios from 'axios'
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

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOG_IN_USER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: LOG_IN_USER_SUCCESS,
      payload: res.data,
    })

    localStorage.setItem('userData', JSON.stringify(res.data))
    document.location.href = '/'
  } catch (error) {
    dispatch({
      type: LOG_IN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerUser =
  (fName, lName, dName, email, password) => async dispatch => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post(
        '/api/users/register',
        { fName, lName, dName, email, password },
        config
      )

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data,
      })

      dispatch({
        type: LOG_IN_USER_SUCCESS,
        payload: res.data,
      })

      localStorage.setItem('userData', JSON.stringify(res.data))
      document.location.href = '/'
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout = () => dispatch => {
  localStorage.removeItem('userData')
  dispatch({ type: LOG_OUT })
  document.location.href = '/'
}

export const getUser = userID => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    const res = await axios.get(`/api/users/${userID}`, config)

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = userID => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST })

    const {
      loginUser: { userData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }

    await axios.delete(`/api/users/${userID}`, config)

    dispatch({ type: DELETE_USER_SUCCESS })

    localStorage.removeItem('userData')
    document.location.href = '/'
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
