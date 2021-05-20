import React, { useState, useRef, useCallback, useEffect } from 'react'
import Feed from './Feed'
import FeedCompact from './FeedCompact'
import { useSelector } from 'react-redux'
import { openModal } from '../../components/modals/modalReducer'
import ChangeFeedView from '../../components/layout/ChangeFeedView'
import { usePublicPostsInfiniteScroll } from '../../utils/useInfiniteScroll'
import { Icon, Loader } from 'semantic-ui-react'
import CreatePostButton from '../../components/layout/CreatePostButton'

import styles from './FeedsScreen.module.css'

const FeedsScreen = () => {
  const [cardActiveColour, setCardActiveColour] = useState('teal')
  const [listActiveColour, setListActiveColour] = useState('black')
  const [page, setPage] = useState(1)
  const {
    loading: loadingPosts,
    error: errorPosts,
    posts,
    hasMore,
  } = usePublicPostsInfiniteScroll(page)

  const observer = useRef()
  const lastPostRef = useCallback(
    node => {
      if (loadingPosts) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPN => prevPN + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loadingPosts, hasMore]
  )

  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

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

  const savePreviousScrollPosition = e => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset)
    // save pageNumber too and make a condition when making GET request with the save parameter
    // check if there is any saved parameter and if there is, use it / else, just keep doing what it's been doing
  }

  const getScrollPositionFromSessionStorage = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition')
    const parsedPosition = parseInt(scrollPosition)

    if (typeof parsedPosition === 'number') {
      window.scrollTo(0, parsedPosition)
      setTimeout(() => {
        return sessionStorage.removeItem('scrollPosition')
      }, 1000)
    }
  }

  return (
    <>
      <CreatePostButton className={styles['create-button']} />

      {cardActiveColour === 'teal' ? (
        <>
          <ChangeFeedView
            cardActiveColour={cardActiveColour}
            listActiveColour={listActiveColour}
            cardViewHandler={cardViewHandler}
            listViewHandler={listViewHandler}
          />

          <section id='feeds-screen' className={styles['feeds-screen']}>
            {posts.length !== 0 &&
              posts
                .sort((a, b) => {
                  return b.createdAt - a.createdAt
                })
                .map((post, index) => {
                  if (posts.length === index + 1) {
                    return (
                      <div ref={lastPostRef} key={post._id}>
                        <Feed post={post} />
                      </div>
                    )
                  } else {
                    return (
                      <div key={post._id}>
                        <Feed post={post} />
                      </div>
                    )
                  }
                })}
            {posts.length === 0 && !loadingPosts && <p>There is no post</p>}
          </section>
        </>
      ) : (
        <>
          <ChangeFeedView
            cardActiveColour={cardActiveColour}
            listActiveColour={listActiveColour}
            cardViewHandler={cardViewHandler}
            listViewHandler={listViewHandler}
          />

          <section id='feeds-screen' className={styles['feeds-screen']}>
            {posts.length !== 0 &&
              posts
                .sort((a, b) => {
                  return b.createdAt - a.createdAt
                })
                .map((post, index) => {
                  if (posts.length === index + 1) {
                    return (
                      <div ref={lastPostRef} key={post._id}>
                        <FeedCompact post={post} />
                      </div>
                    )
                  } else {
                    return (
                      <div key={post._id}>
                        <FeedCompact post={post} />
                      </div>
                    )
                  }
                })}
            {posts.length === 0 && !loadingPosts && <p>There is no post</p>}
          </section>
        </>
      )}

      {loadingPosts && (
        <Loader
          active
          size='big'
          inline='centered'
          style={{ marginTop: '36vh' }}
        />
      )}
      {errorPosts && 'There was an error'}

      {!hasMore && !loadingPosts && (
        <div className={styles['posts-endpoint']}>
          {!hasMore && <Icon name='circle' size='large' disabled />}
        </div>
      )}
    </>
  )
}

export default FeedsScreen
