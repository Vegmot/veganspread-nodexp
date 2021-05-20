import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Checkbox, Button, Container, TextArea } from 'semantic-ui-react'
import MyTextArea from '../../../components/form/MyTextInput'
import { writePost } from '../../../actions/postActions'
import LoginForm from '../../auth/LoginForm'
import ModalWrapper from '../../../components/modals/ModalWrapper'

import styles from './PostForm.module.css'
import PhotoUploadForm from './PhotoUploadForm'

const PostForm = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  const photoUploadFormStyle = {
    margin: '0 auto',
  }

  const textareaStyle = {
    resize: 'none',
    margin: '0 auto 4% auto',
    width: '60%',
  }

  const checkboxStyle = {
    display: 'block',
    margin: '0 auto 4% auto',
  }

  const buttonStyle = {
    width: '50%',
    margin: '0 auto',
  }

  return (
    <>
      {userData ? (
        <ModalWrapper size='tiny' header='Create a new post'>
          <div className={styles['create-form-container']}>
            <Container text>
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
                      <PhotoUploadForm style={photoUploadFormStyle} />

                      <Form className='ui form'>
                        <div className={styles['post-area-container']}>
                          <TextArea
                            name='text'
                            type='text'
                            rows='10'
                            cols='30'
                            placeholder='What do you have in mind?'
                            style={textareaStyle}
                            className={styles['post-text-area']}
                          />

                          <Checkbox
                            toggle
                            label='Make this post private'
                            className={styles['post-privacy-area']}
                            style={checkboxStyle}
                          />

                          <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Post'
                            style={buttonStyle}
                          />
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </>
            </Container>
          </div>
        </ModalWrapper>
      ) : (
        <LoginForm />
      )}
    </>
  )
}

export default PostForm
