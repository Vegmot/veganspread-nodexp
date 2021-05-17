import React from 'react'
import { Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { closeModal } from '../../components/modals/modalReducer'
import { registerUser } from '../../actions/userActions'
import { Button, Label, Divider } from 'semantic-ui-react'

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
            confirmPassword: '',
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
            confirmPassword: Yup.string().when('password', {
              is: val => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Passwords do not match'
              ),
            }),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            try {
              console.log(values)
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
              setErrors({ errors: error.message })
              setSubmitting(false)
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
              <MyTextInput
                name='confirmPassword'
                placeholder='Confirm password'
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
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  )
}

export default RegisterForm
