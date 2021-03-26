import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../../screens/auth/LoginForm'
import RegisterForm from '../../screens/auth/RegisterForm'

const ModalManager = () => {
  const modalLookup = { LoginForm, RegisterForm }
  const currentModal = useSelector(state => state.modals)
  let renderedModal

  if (currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookup[modalType]
    renderedModal = <ModalComponent {...modalProps} />
  }

  return <span>{renderedModal}</span>
}

export default ModalManager
