import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import { displayTimestamp } from '../../utils/displayTimestamp'

import './Feed.css'

const Feed = ({ feed }) => {
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
                  {feed.isAd ? (
                    <span style={{ color: '#01b5ac' }}>Advertisement</span>
                  ) : (
                    <Link to={`/user/${feed.userID}`} className='user-details'>
                      {feed.userID}
                    </Link>
                  )}
                </strong>
              </span>
            </p>
          </div>

          <div className='feed-content-image'>
            <Link to={`/feed/${feed.feedID}`}>
              <Image src={feed.image || ''} fluid centered alt='Sample image' />
            </Link>
          </div>

          <div className='feed-details'>
            {feed.isAd ? (
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

                <Link to={`/feed/${feed.feedID}`}>
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
                {feed.isAd ? (
                  <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                ) : (
                  <strong>{feed.userID}</strong>
                )}
              </span>{' '}
              {feed.text && feed.text.length > 200
                ? feed.text.substring(0, 200)
                : feed.text}
            </p>
          </div>

          <div className='feed-footer'>
            <small className='feed-footer-timestamp'>
              {feed.isAd ? '' : displayTimestamp(Date.now(), feed.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
