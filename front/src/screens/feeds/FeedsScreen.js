import React, { useState } from 'react'
import Feed from './Feed'
import { feedData } from '../../data/feedData'
import { Button, Icon } from 'semantic-ui-react'

import './FeedsScreen.css'
import FeedCompact from './FeedCompact'

const FeedsScreen = () => {
  const [cardActiveColour, setCardActiveColour] = useState('teal')
  const [listActiveColour, setListActiveColour] = useState('black')

  const [loading, setLoading] = useState(false)

  const cardViewHandler = () => {
    if (cardActiveColour === 'black') {
      setCardActiveColour('teal')
      setListActiveColour('black')
    } else {
      return
    }
  }

  const listViewHandler = () => {
    if (listActiveColour === 'black') {
      setListActiveColour('teal')
      setCardActiveColour('black')
    } else {
      return
    }
  }

  return (
    <>
      {cardActiveColour === 'teal' ? (
        <>
          <section id='feeds-screen' className='feeds-screen'>
            <div className='feeds-change-view'>
              <Icon
                name='th large'
                color={cardActiveColour}
                size='large'
                onClick={cardViewHandler}
              />
              <Icon
                name='th list'
                color={listActiveColour}
                size='large'
                onClick={listViewHandler}
              />
            </div>

            {feedData
              .sort((a, b) => {
                return b.createdAt - a.createdAt
              })
              .map(
                feed =>
                  !feed.isPrivate && <Feed feed={feed} key={feed.feedID} />
              )}
          </section>

          <div className='load-more-button'>
            <Button icon='plus circle' size='huge' className='load-more-btn' />
          </div>
        </>
      ) : (
        <>
          <section id='feeds-screen' className='feeds-screen'>
            <div className='feeds-change-view'>
              <Icon
                name='th large'
                color={cardActiveColour}
                size='large'
                onClick={cardViewHandler}
              />
              <Icon
                name='th list'
                color={listActiveColour}
                size='large'
                onClick={listViewHandler}
              />
            </div>

            {feedData
              .sort((a, b) => {
                return b.createdAt - a.createdAt
              })
              .map(
                feed =>
                  !feed.isPrivate && (
                    <FeedCompact feed={feed} key={feed.feedID} />
                  )
              )}
          </section>

          <div className='load-more-button'>
            <Button icon='plus circle' size='huge' className='load-more-btn' />
          </div>
        </>
      )}
    </>
  )
}

export default FeedsScreen
