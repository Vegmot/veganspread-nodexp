import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import { displayTimestamp } from '../../utils/displayTimestamp'

import './FeedCompact.css'

const FeedCompact = ({ post }) => {
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
      <section id='feed-compact-screen' className='feed-compact-screen'>
        <div id='feed-compact' className='feed-compact'>
          <div className='feed-compact-container'>
            <div className='feed-compact-image'>
              <Link to={`/feed?/${post._id}`}>
                <Image
                  src={post.image}
                  alt={`Image uploaded by ${post.displayName}`}
                  fluid
                />
              </Link>
            </div>

            <div className='feed-compact-content'>
              <div className='feed-compact-poster'>
                <strong>
                  {post.isAd ? (
                    <span style={{ color: '#01b5ac' }}>Advertisement</span>
                  ) : (
                    ''
                  )}
                </strong>
              </div>

              <div className='feed-compact-text'>
                <p>
                  <span className='feed-content-text-user'>
                    {post.isAd ? (
                      <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                    ) : (
                      <strong>{post.displayName}</strong>
                    )}
                  </span>{' '}
                  {post.text && post.text.length > 100
                    ? post.text.substring(0, 100) + '...'
                    : post.text}
                </p>
              </div>

              <div className='feed-compact-footer'>
                <small>{displayTimestamp(Date.now(), post.createdAt)}</small>
              </div>

              <div className='split-line'></div>

              <div className='feed-compact-details'>
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
                      className='feed-details-icon'
                      name={heartName}
                      color={heartColour}
                      onClick={heartFillHandler}
                      size='large'
                    />
                    <Icon
                      link
                      className='feed-details-icon'
                      name='comment outline'
                      size='large'
                    />
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FeedCompact
