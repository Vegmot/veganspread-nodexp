import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import { Button, Icon, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicPosts, fetchMyPosts } from '../../actions/postActions'
import FeedCompact from './FeedCompact'
import { openModal } from '../../components/modals/modalReducer'
import InfiniteScroll from 'react-infinite-scroller'

import './FeedsScreen.css'

const FeedsScreen = () => {
  const dispatch = useDispatch()

  const [cardActiveColour, setCardActiveColour] = useState('teal')
  const [listActiveColour, setListActiveColour] = useState('black')

  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  useEffect(() => {
    if (!userData) dispatch(fetchPublicPosts())

    if (!userData && loadingMy) {
      loadingMy = false
      dispatch(openModal({ modalType: 'LoginForm' }))
    }

    if (userData && successMy) dispatch(fetchMyPosts(userData._id))

    if (successPublic) dispatch(fetchPublicPosts())
  }, [dispatch])

  const getPublicPosts = useSelector(state => state.getPublicPosts)
  const {
    loading: loadingPublic,
    success: successPublic,
    posts,
  } = getPublicPosts

  const getMyPosts = useSelector(state => state.getMyPosts)
  const { loading: loadingMy, success: successMy, posts: myPosts } = getMyPosts

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
    dispatch(fetchPublicPosts())
  }

  const displayMyPosts = userID => {
    dispatch(fetchMyPosts(userID))
  }

  return (
    <>
      {cardActiveColour === 'teal' ? (
        <>
          <div className='feeds-change-view'>
            <Icon
              name='th'
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

            <Dropdown icon='filter large' className='feeds-filter-dropdown'>
              <Dropdown.Menu>
                <Dropdown.Item
                  icon='globe'
                  text='All posts'
                  onClick={() => displayPublicPosts()}
                />
                <Dropdown.Item
                  icon='write'
                  text='My posts'
                  onClick={() => displayMyPosts()}
                />
                <Dropdown.Item icon='bookmark' text='Saved posts' />
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <section id='feeds-screen' className='feeds-screen'>
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
