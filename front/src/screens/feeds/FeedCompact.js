import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'

import './FeedCompact.css'

const FeedCompact = ({ feed }) => {
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

  const displayTimestamp = (timeNow, timePosted) => {
    // timePosted CANNOT be larger than timeNow

    // year
    const timePassedInSeconds = (timeNow - timePosted) / 1000
    if (timePassedInSeconds > 31536000) {
      return `${Math.floor(timePassedInSeconds / 31536000)}y ago`
    }

    // month
    if (timePassedInSeconds > 2415600 && timePassedInSeconds < 31536000) {
      return `${Math.floor(timePassedInSeconds / 2415600)}mth ago`
    }

    // day
    if (timePassedInSeconds > 86400 && timePassedInSeconds < 2415600) {
      return `${Math.floor(timePassedInSeconds / 86400)}d ago`
    }

    // hour
    if (timePassedInSeconds > 3600 && timePassedInSeconds < 86400) {
      return `${Math.floor(timePassedInSeconds / 3600)}h ago`
    }

    // minute
    if (timePassedInSeconds > 60 && timePassedInSeconds < 36400) {
      return `${Math.floor(timePassedInSeconds / 60)}min ago`
    }

    // second
    if (timePassedInSeconds < 60) {
      return 'Just now'
    }
  }

  return (
    <>
      <section id='feed-compact-screen' className='feed-compact-screen'>
        <div id='feed-compact' className='feed-compact'>
          <div className='feed-compact-container'>
            <div className='feed-compact-image'>
              <Link to={`/feed/${feed.feedID}`}>
                <Image
                  src={feed.image}
                  alt={`Image uploaded by ${feed.userID}`}
                  fluid
                />
              </Link>
            </div>

            <div className='feed-compact-content'>
              <div className='feed-compact-poster'>
                <strong>
                  {feed.isAd ? (
                    <span style={{ color: '#01b5ac' }}>Advertisement</span>
                  ) : (
                    ''
                  )}
                </strong>
              </div>

              <div className='feed-compact-text'>
                <p>
                  <span className='feed-content-text-user'>
                    {feed.isAd ? (
                      <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                    ) : (
                      <strong>{feed.userID}</strong>
                    )}
                  </span>{' '}
                  {feed.text && feed.text.length > 100
                    ? feed.text.substring(0, 100) + '...'
                    : feed.text}
                </p>
              </div>

              <div className='feed-compact-footer'>
                <small>{displayTimestamp(Date.now(), feed.createdAt)}</small>
              </div>

              <div className='feed-compact-details'>
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
