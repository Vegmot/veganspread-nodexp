import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Checkbox, Button, Container, TextArea, Label } from 'semantic-ui-react'
import MyTextArea from '../../../components/form/MyTextInput'
import { writePost } from '../../../actions/postActions'
import LoginForm from '../../auth/LoginForm'
import ModalWrapper from '../../../components/modals/ModalWrapper'
import PhotoUploadForm from './PhotoUploadForm'
import Thumbnail from './Thumbnail'

import styles from './PostForm.module.css'

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
                    isPrivate: false,
                  }}
                  validationSchema={Yup.object({
                    image: Yup.string().required('Please upload an image'),
                    text: Yup.string().required('Please enter text'),
                    isPrivate: Yup.boolean(),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    try {
                      dispatch(
                        writePost(values.image, values.text, values.isPrivate)
                      )
                      setSubmitting(false)
                    } catch (error) {
                      setSubmitting(false)
                      console.error(error.message)
                    }
                  }}
                >
                  {({ isSubmitting, isValid, setFieldValue, values }) => (
                    <>
                      <Form className='ui form'>
                        <Label content='Upload an image' icon='photo' />
                        <input
                          id='file'
                          name='file'
                          type='file'
                          onChange={e => {
                            setFieldValue('file', e.currentTarget.files[0])
                            console.log(
                              'e.currentTarget.files[0]: ',
                              e.currentTarget.files[0]
                            )
                          }}
                          className={styles['form-control']}
                        />

                        <Thumbnail file={values.file} />

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
                            name='isPrivate'
                            label='Make this post private'
                            className={styles['post-privacy-area']}
                            style={checkboxStyle}
                          />

                          <Button
                            loading={isSubmitting}
                            disabled={isSubmitting}
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
