import React, { useState, useRef, useCallback } from 'react'
import { useCommentsInfiniteScroll } from '../../../utils/useInfiniteScroll'
import EachComment from '../comments/EachComment'
import { Button } from 'semantic-ui-react'

import styles from './CommentsScreen.module.css'

const CommentsScreen = ({ match }) => {
  const pid = match.params.id
  const postTextLength = 150

  const [page, setPage] = useState(1)
  const [commentText, setCommentText] = useState('')
  const {
    loading: loadingComments,
    error: errorComments,
    comments,
    hasMore,
  } = useCommentsInfiniteScroll(pid, page)

  const observer = useRef()
  const lastCommentRef = useCallback(
    node => {
      if (loadingComments) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPN => prevPN + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loadingComments, hasMore]
  )

  // test rubbish data
  const commentID = 'comment' + Math.floor(Math.random() * 1000).toString()
  const userID = 'user' + Math.floor(Math.random() * 1000).toString()
  const text = 'commentText'
  const createdAt = Date.now()
  const isPrivate = false
  const formData = { commentID, userID, text, createdAt, isPrivate }
  // test rubbish data

  const postCommentHandler = e => {
    e.preventDefault()

    setCommentText('')
  }
  return (
    <>
      <form onSubmit={postCommentHandler}>
        <div className={styles['comment-input-area']}>
          <input
            type='text'
            style={{ fontSize: '16px' }}
            placeholder='Say something...'
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <Button
            content='Post'
            disabled={
              commentText.length === 0 || commentText.length > postTextLength
            }
            type='submit'
          />
        </div>
      </form>

      <div className={styles['each-feed-comments-container']}>
        <div className={styles['each-comment-container']}>
          {comments?.length > 0 ? (
            comments
              .sort((a, b) => {
                return b.createdAt - a.createdAt
              })
              .map((comment, index) => {
                if (comments.length === index + 1) {
                  return (
                    <div ref={lastCommentRef} key={comment._id}>
                      <EachComment comment={comment} />
                    </div>
                  )
                } else {
                  return (
                    <div key={comment._id}>
                      <EachComment comment={comment} />
                    </div>
                  )
                }
              })
          ) : (
            <p>This feed has no comment yet.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default CommentsScreen
