import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Image } from 'semantic-ui-react'
import { feedData } from '../../data/feedData'
import { displayTimestamp } from '../../utils/displayTimestamp'
import EachComment from './comments/EachComment'

import './EachFeedScreen.css'

const EachFeedScreen = ({ history, match }) => {
  // this part actually needs to make a get request later
  const feed = feedData.find(f => f.feedID === match.params.id)
  const [comments, setComments] = useState(feed.comments)

  const [heartName, setHeartName] = useState('heart outline')
  const [heartColour, setHeartColour] = useState('black')
  const [bookmarkName, setBookmarkName] = useState('bookmark outline')
  const [bookmarkColour, setBookmarkColour] = useState('black')

  const [commentText, setCommentText] = useState('')

  const postTextLength = 150

  // test rubbish data
  const commentID = 'comment' + Math.floor(Math.random() * 1000).toString()
  const userID = 'user' + Math.floor(Math.random() * 1000).toString()
  const text = commentText
  const createdAt = Date.now()
  const isPrivate = false
  const formData = { commentID, userID, text, createdAt, isPrivate }
  // test rubbish data

  const heartFillHandler = () => {
    if (heartName === 'heart outline' && heartColour === 'black') {
      setHeartName('heart')
      setHeartColour('red')
    } else {
      setHeartName('heart outline')
      setHeartColour('black')
    }
  }

  const bookMarkHandler = () => {
    if (bookmarkName === 'bookmark outline' && bookmarkColour === 'black') {
      setBookmarkName('bookmark')
      setBookmarkColour('teal')
    } else {
      setBookmarkName('bookmark outline')
      setBookmarkColour('black')
    }
  }

  const postCommentHandler = e => {
    e.preventDefault()
    setComments([formData, ...comments])
    setCommentText('')
  }

  return (
    <>
      <Button
        content='Go back'
        icon='angle left'
        style={{
          background: 'transparent',
          padding: 0,
          marginTop: '6%',
          marginLeft: '18%',
        }}
        onClick={history.goBack}
      />

      <section id='each-feed-screen' className='each-feed-screen'>
        <div className='each-feed-contents-area'>
          <div className='each-feed-container'>
            <div className='each-feed-content-image'>
              <Image src={feed.image || ''} fluid centered alt='Sample image' />
            </div>

            <div className='each-feed-details'>
              {feed.isAd ? (
                <>
                  <Icon
                    link
                    className='each-feed-details-icon'
                    name='paper plane outline'
                    size='large'
                  />
                </>
              ) : (
                <>
                  <Icon
                    link
                    className='each-feed-details-icon'
                    name={heartName}
                    color={heartColour}
                    onClick={heartFillHandler}
                    size='large'
                  />
                  <Icon
                    link
                    className='each-feed-details-icon'
                    name='comment outline'
                    size='large'
                  />
                  <Icon
                    link
                    className='each-feed-details-icon'
                    name='paper plane outline'
                    size='large'
                  />
                  <Icon
                    link
                    className='each-feed-details-icon'
                    name={bookmarkName}
                    color={bookmarkColour}
                    onClick={bookMarkHandler}
                    size='large'
                    style={{ float: 'right' }}
                  />
                </>
              )}
            </div>

            <div className='each-feed-timestamp'>
              <small style={{ color: '#aaa ' }}>
                {feed.isAd ? '' : displayTimestamp(Date.now(), feed.createdAt)}
              </small>
            </div>

            <div className='each-feed-content-text'>
              <p>
                <span className='each-feed-content-text-user'>
                  {feed.isAd ? (
                    <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                  ) : (
                    <strong>{feed.userID}</strong>
                  )}
                </span>{' '}
                {feed.text}
              </p>
            </div>
          </div>
        </div>

        <div className='each-feed-comments-container'>
          <div className='each-comment-container'>
            {comments?.length > 0 ? (
              comments
                .sort((a, b) => {
                  return b.createdAt - a.createdAt
                })
                .map(comment => (
                  <EachComment comment={comment} key={comment.commentID} />
                ))
            ) : (
              <p>This feed has no comment yet.</p>
            )}
          </div>

          <div className='split-line'></div>

          <form onSubmit={postCommentHandler}>
            <div className='comment-input-area'>
              <input
                type='text'
                placeholder='Say something...'
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />
              <Button
                content='Post'
                disabled={
                  commentText.length === 0 ||
                  commentText.length > postTextLength
                }
                type='submit'
              />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default withRouter(EachFeedScreen)
