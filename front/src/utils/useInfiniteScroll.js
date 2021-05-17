import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePublicPostsInfiniteScroll = page => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios({
      method: 'GET',
      url: '/api/posts',
      params: { page },
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
        setLoading(false)
      })
  }, [page])
  return { loading, error, posts, hasMore }
}

export const useCommentsInfiniteScroll = (pid, page) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios({
      method: 'GET',
      url: `/api/comments/${pid}`,
      params: { page },
    })
      .then(res => {
        setComments(prevComments => {
          return [...prevComments, ...res.data.comments.map(cmt => cmt)]
        })
        setHasMore(res.data.comments.length > 0)
        setLoading(false)
      })
      .catch(e => {
        setError('There was an error')
        setLoading(false)
      })
  }, [pid, page])
  return { loading, error, comments, hasMore }
}
