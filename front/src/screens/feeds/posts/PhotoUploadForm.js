import React, { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import cuid from 'cuid'
import { getFileExtension } from '../util/util'
import { uploadToFirebaseStorage } from '../../firestore/firebaseService'
import { toast } from 'react-toastify'
import { updateUserProfilePhoto } from '../../firestore/firestoreService'

const PhotoUploadForm = ({ setEditMode }) => {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const uploadImageHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await axios.post('/api/upload', formData, config)

      setImage(res.data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const cancelCropHandler = () => {
    setFiles([])
    setImage(null)
  }

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <Header color='teal' sub contents='Step 1 - Add photo' />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>

        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header color='teal' sub contents='Step 2 - Resize' />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>

        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header color='teal' sub contents='Step 3 - Preview and upload' />
          {files.length > 0 && (
            <>
              <div
                className='img-preview'
                style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={uploadImageHandler}
                  style={{ width: 100 }}
                  positive
                  icon='check'
                />
                <Button
                  disabled={loading}
                  onClick={cancelCropHandler}
                  style={{ width: 100 }}
                  icon='close'
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  )
}

export default PhotoUploadForm
