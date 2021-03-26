import React from 'react'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import { Button, Divider, Label } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../components/modals/modalReducer'
import { signInWithEmail } from '../../config/firebaseService'
import SocialLogin from './SocialLogin'

const LoginForm = () => {
  const dispatch = useDispatch()

  return (
    <ModalWrapper size='mini' header='Sign in'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values)
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ auth: error.message })
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email address' />
            <MyTextInput
              name='password'
              placeholder='Password'
              type='password'
            />

            {errors.auth && (
              <Label
                basic
                color='red'
                style={{ marginBottom: '10' }}
                content={errors.auth}
              />
            )}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />

            <Divider horizontal>Or</Divider>

            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
