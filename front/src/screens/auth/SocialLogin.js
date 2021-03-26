import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { closeModal } from '../../components/modals/modalReducer'
import { socialLogin } from '../../config/firebaseService'

const SocialLogin = () => {
  const dispatch = useDispatch()

  const socialLoginHandler = provider => {
    dispatch(closeModal())
    socialLogin(provider)
  }

  return (
    <>
      <Button
        icon='google'
        fluid
        color='google plus'
        content='Login with Google'
        onClick={() => socialLoginHandler('google')}
      />
    </>
  )
}

export default SocialLogin
