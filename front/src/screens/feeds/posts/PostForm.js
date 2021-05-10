import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Checkbox, Button, Container } from 'semantic-ui-react'
import MyTextArea from '../../../components/form/MyTextInput'
import { writePost } from '../../../actions/postActions'
import LoginForm from '../../auth/LoginForm'

import './PostForm.css'

const PostForm = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  return (
    <>
      <div class='create-form-container'>
        <Container text>
          {userData ? (
            <>
              <Formik
                initialValues={{
                  image: '',
                  text: '',
                }}
                validationSchema={Yup.object({
                  image: Yup.string().required('Please upload an image'),
                  text: Yup.string().required('Please enter text'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  try {
                    dispatch(writePost(values.image, values.text))
                    setSubmitting(false)
                  } catch (error) {
                    setSubmitting(false)
                    console.error(error.message)
                  }
                }}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <>
                    <p>Photo upload area to be added here</p>

                    <Form className='ui form'>
                      <MyTextArea
                        name='text'
                        type='text'
                        placeholder='What do you have in mind?'
                      />

                      <Checkbox toggle label='Make this post private' />

                      <Button
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                        type='submit'
                        fluid
                        size='large'
                        color='teal'
                        content='Post'
                      />
                    </Form>
                  </>
                )}
              </Formik>
            </>
          ) : (
            <LoginForm />
          )}
        </Container>
      </div>
    </>
  )
}

export default PostForm
