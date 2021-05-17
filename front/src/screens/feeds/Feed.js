import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import { displayTimestamp } from '../../utils/displayTimestamp'

import './Feed.css'

const Feed = ({ post }) => {
  const [heartName, setHeartName] = useState('heart outline')
  const [heartColour, setHeartColour] = useState('black')
  const [bookmarkName, setBookmarkName] = useState('bookmark outline')
  const [bookmarkColour, setBookmarkColour] = useState('black')

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

  return (
    <>
      <div id='feed' className='feed'>
        <div className='feed-container'>
          <div className='feed-header'>
            <p className='feed-header-poster'>
              <span className='feed-header-poster-name'>
                <strong>
                  {post.isAd ? (
                    <span style={{ color: '#01b5ac' }}>Advertisement</span>
                  ) : (
                    <Link to={`/user/${post.user}`} className='user-details'>
                      {post.displayName}
                    </Link>
                  )}
                </strong>
              </span>
            </p>
          </div>

          <div className='feed-content-image'>
            <Link to={`/feed/${post._id}`}>
              <Image src={post.image} fluid centered alt='Sample image' />
            </Link>
          </div>

          <div className='feed-details'>
            {post.isAd ? (
              <>
                <Icon
                  link
                  className='feed-details-icon'
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

                <Link to={`/feed/${post._id}`}>
                  <Icon
                    link
                    className='feed-details-icon'
                    name='comment outline'
                    size='large'
                  />
                </Link>

                <Icon
                  link
                  className='feed-details-icon'
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

          <div className='feed-content-text'>
            <p>
              <span className='feed-content-text-user'>
                {post.isAd ? (
                  <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                ) : (
                  <strong>{post.displayName}</strong>
                )}
              </span>{' '}
              {post.text && post.text.length > 200
                ? post.text.substring(0, 200)
                : post.text}
            </p>
          </div>

          <div className='feed-footer'>
            <small className='feed-footer-timestamp'>
              {post.isAd ? '' : displayTimestamp(Date.now(), post.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
