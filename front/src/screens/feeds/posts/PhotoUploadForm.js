import React, { useState } from 'react'
import axios from 'axios'
import { Button, Grid, Header } from 'semantic-ui-react'
import cuid from 'cuid'
import { getFileExtension } from '../../../utils/getFileExtension'
import { toast } from 'react-toastify'
import PhotoDropZone from './PhotoDropZone'
import PhotoCropper from './PhotoCropper'

const PhotoUploadForm = ({ setEditMode }) => {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

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
      console.log('files: ', files)
      console.log('image: ', image)
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
      <PhotoDropZone
        value={image}
        image={image}
        setImage={setImage}
        setFiles={setFiles}
        onChange={uploadImageHandler}
      />

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
  )
}

export default PhotoUploadForm
