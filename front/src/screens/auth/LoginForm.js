import React from 'react'
import ModalWrapper from '../../components/modals/ModalWrapper'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../components/form/MyTextInput'
import { Button, Divider, Label } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../components/modals/modalReducer'
import { login } from '../../actions/userActions'

const LoginForm = () => {
  const dispatch = useDispatch()

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
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ errors: error.message })
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

            {errors && (
              <Label
                basic
                color='red'
                style={{ marginBottom: '10' }}
                content={errors && JSON.stringify(errors)}
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
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}

export default LoginForm
