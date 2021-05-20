import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './CreatePostButton.module.css'
import { openModal } from '../modals/modalReducer'

const CreatePostButton = () => {
  const dispatch = useDispatch()

  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  const handleCheckUserData = () => {
    if (!userData) {
      return () => dispatch(openModal({ modalType: 'LoginForm' }))
    } else {
      return () => dispatch(openModal({ modalType: 'PostForm' }))
    }
  }

  return (
    <div className={styles['create-post-button']}>
      <Button
        icon='plus'
        color='teal'
        onClick={
          !userData
            ? () => dispatch(openModal({ modalType: 'LoginForm' }))
            : () => dispatch(openModal({ modalType: 'PostForm' }))
        }
      />
    </div>
  )
}

export default CreatePostButton
