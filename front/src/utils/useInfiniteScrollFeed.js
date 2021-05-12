import { useEffect, useState } from 'react'
import axios from 'axios'

const useInfiniteScrollFeed = pageNumber => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/posts',
      params: { page: pageNumber },
    })
      .then(res => {
        setPosts(prevPosts => {
          return [...prevPosts, ...res.data.posts.map(post => post)]
        })
        setHasMore(res.data.posts.length > 0)
        setLoading(false)
      })
      .catch(e => {
        setError('There was an error')
      })
  }, [pageNumber])
  return { loading, error, posts, hasMore }
}

export default useInfiniteScrollFeed
