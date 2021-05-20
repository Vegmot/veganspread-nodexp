import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon, Input } from 'semantic-ui-react'

const PhotoDropZone = ({ setFiles, image, setImage }) => {
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
    textAlign: 'center',
    width: '60%',
    margin: '0 auto 5%',
  }

  const dropzoneActive = {
    border: 'dashed 3px teal',
  }

  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    [setFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div
        {...getRootProps()}
        style={
          isDragActive
            ? { ...dropzoneStyles, ...dropzoneActive }
            : dropzoneStyles
        }
      >
        <input {...getInputProps()} />

        <Icon name='upload' size='huge' />
        <Header content='Click to upload image' />
      </div>
      <Input
        type='text'
        placeholder='Image URL'
        value={image}
        onChange={e => setImage(e.target.value)}
      />
    </>
  )
}

export default PhotoDropZone
