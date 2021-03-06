import React, { useState } from 'react'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import { Button, Label } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../components/modals/modalReducer'
import { login } from '../../actions/userActions'

const LoginForm = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser)
  const { loading, userData, error: errorMsg } = loginUser

  const [loginError, setLoginError] = useState('')
  const [changed, setChanged] = useState(false)

  return (
    <ModalWrapper size='mini' header='Sign in'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('Please enter email'),
          password: Yup.string().required('Please enter password'),
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          try {
            dispatch(login(values.email, values.password))

            if (errorMsg || !userData) {
              setSubmitting(false)
              setLoginError(errorMsg)
              console.log('Logging inside else statement: ', errorMsg)
            } else {
              setSubmitting(false)
              dispatch(closeModal())
            }
          } catch (error) {
            setErrors({ errors: error.message })
            setSubmitting(false)
            console.log('Logging inside catch')
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, handleChange, handleBlur }) => (
          <Form className='ui form'>
            <MyTextInput
              name='email'
              placeholder='Email address'
              onChange={e => {
                setChanged(true)
                handleChange(e)
              }}
              onBlur={handleBlur}
            />
            <MyTextInput
              name='password'
              placeholder='Password'
              type='password'
              onChange={e => {
                setChanged(true)
                handleChange(e)
              }}
              onBlur={handleBlur}
            />

            {!changed && loginError && (
              <Label
                basic
                color='red'
                style={{ marginBottom: '10px' }}
                content={loginError}
              />
            )}

            <Button
              loading={isSubmitting || loading}
              disabled={!isValid || !dirty || isSubmitting || !changed}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
