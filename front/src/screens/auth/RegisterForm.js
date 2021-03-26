import React from 'react'
import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { closeModal } from '../../components/modals/modalReducer'
import { registerInFirebase } from '../../config/firebaseService'
import SocialLogin from '../auth/SocialLogin'
import { Button, Divider } from 'semantic-ui-react'

const RegisterForm = () => {
  const dispatch = useDispatch()

  return (
    <>
      <ModalWrapper size='mini' header='Register'>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Please enter your first name'),
            lastName: Yup.string().required('Please enter your last name'),
            email: Yup.string()
              .required('Please enter valid email address')
              .email(),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await registerInFirebase(values)
              setSubmitting(false)
              dispatch(closeModal())
            } catch (error) {
              setSubmitting(false)
              console.error(error.message)
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MyTextInput name='firstName' placeholder='First name' />
              <MyTextInput name='lastName' placeholder='Last name' />
              <MyTextInput
                name='email'
                placeholder='Email address'
                type='email'
              />
              <MyTextInput
                name='password'
                placeholder='Password'
                type='password'
              />

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Register'
              />

              <Divider horizontal>Or</Divider>

              <SocialLogin />
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  )
}

export default RegisterForm
