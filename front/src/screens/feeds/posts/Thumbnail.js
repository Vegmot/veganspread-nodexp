import { useEffect, useState } from 'react'
import { Image, Loader } from 'semantic-ui-react'

const Thumbnail = ({ file }) => {
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    setLoading(true)
    if (!file) return

    if (file) {
      let reader = new FileReader()

      reader.onloadend = () => {
        setLoading(false)
        setThumbnail(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }, [file])

  return (
    <div>
      {loading && <Loader />}
      {file && <Image src={thumbnail} alt={file?.name} />}
    </div>
  )
}

export default Thumbnail
