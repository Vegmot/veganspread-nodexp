import React from 'react'
import { Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { closeModal } from '../../components/modals/modalReducer'
import { registerUser } from '../../actions/userActions'
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
            displayName: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('Please enter your first name'),
            lastName: Yup.string().required('Please enter your last name'),
            displayName: Yup.string().required(
              'Please enter your preferred username'
            ),
            email: Yup.string()
              .required('Please enter valid email address')
              .email(),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            try {
              dispatch(
                registerUser(
                  values.firstName,
                  values.lastName,
                  values.displayName,
                  values.email,
                  values.password
                )
              )
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
              <MyTextInput name='displayName' placeholder='Username' />
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
