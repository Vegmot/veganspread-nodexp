import React, { useState, useRef, useCallback } from 'react'
import Feed from './Feed'
import { useSelector } from 'react-redux'
import FeedCompact from './FeedCompact'
import { openModal } from '../../components/modals/modalReducer'
import ChangeFeedView from '../../components/layout/ChangeFeedView'
import { usePublicPostsInfiniteScroll } from '../../utils/useInfiniteScroll'

import './FeedsScreen.css'
import { Icon, Loader } from 'semantic-ui-react'

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

  return (
    <>
      {cardActiveColour === 'teal' ? (
        <>
          <ChangeFeedView
            cardActiveColour={cardActiveColour}
            listActiveColour={listActiveColour}
            cardViewHandler={cardViewHandler}
            listViewHandler={listViewHandler}
          />

          <section id='feeds-screen' className='feeds-screen'>
            {posts.length !== 0
              ? posts
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
                  })
              : 'There is no post'}
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

          <section id='feeds-screen' className='feeds-screen'>
            {loadingPosts && <Loader active size='big' inline='centered' />}
            {posts.length !== 0
              ? posts
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
                  })
              : 'There is no post'}
          </section>
        </>
      )}

      {loadingPosts && <Loader active size='big' inline='centered' />}
      {errorPosts && 'There was an error'}

      {!hasMore && <Icon name='circle' size='large' disabled />}
    </>
  )
}

export default FeedsScreen
