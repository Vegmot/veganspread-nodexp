import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import { feedData } from '../../data/feedData'
import { Button, Icon, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicPosts, fetchPrivatePosts } from '../../actions/postActions'

import './FeedsScreen.css'
import FeedCompact from './FeedCompact'

const FeedsScreen = () => {
  const dispatch = useDispatch()

  const [cardActiveColour, setCardActiveColour] = useState('teal')
  const [listActiveColour, setListActiveColour] = useState('black')

  useEffect(() => {
    dispatch(fetchPublicPosts())
  }, [dispatch])

  const getPublicPosts = useSelector(state => state.getPublicPosts)
  const {
    loading: loadingPublic,
    success: successPublic,
    posts,
  } = getPublicPosts

  const getPrivatePosts = useSelector(state => state.getPrivatePosts)
  const {
    loading: loadingPrivate,
    success: successPrivate,
    posts: privatePosts,
  } = getPrivatePosts

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

  const displayPublicPosts = () => {
    dispatch(getPublicPosts())
  }

  const displatPrivatePosts = userID => {
    dispatch(getPrivatePosts(userID))
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

              <Dropdown icon='filter large'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='globe' text='All posts' />
                  <Dropdown.Item icon='write' text='My posts' />
                  <Dropdown.Item icon='bookmark' text='Saved posts' />
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {posts
              .sort((a, b) => {
                return b.createdAt - a.createdAt
              })
              .map(post => (
                <Feed post={post} key={post._id} />
              ))}
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

              <Dropdown icon='filter large'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='globe' text='All posts' />
                  <Dropdown.Item icon='write' text='My posts' />
                  <Dropdown.Item icon='bookmark' text='Saved posts' />
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {posts
              .sort((a, b) => {
                return b.createdAt - a.createdAt
              })
              .map(post => (
                <FeedCompact post={post} key={post._id} />
              ))}
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
