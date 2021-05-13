import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicPosts } from '../../actions/postActions'
import FeedCompact from './FeedCompact'
import { openModal } from '../../components/modals/modalReducer'
import ChangeFeedView from '../../components/layout/ChangeFeedView'
import InfiniteScroll from 'react-infinite-scroller'

import './FeedsScreen.css'

const FeedsScreen = ({ match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const [cardActiveColour, setCardActiveColour] = useState('teal')
  const [listActiveColour, setListActiveColour] = useState('black')

  let page = 0
  const postsPerPage = 6

  const [feed, setFeed] = useState([])

  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  const getPublicPosts = useSelector(state => state.getPublicPosts)
  const {
    loading: loadingPublic,
    success: successPublic,
    posts,
  } = getPublicPosts

  useEffect(() => {
    dispatch(fetchPublicPosts(pageNumber))
  }, [dispatch, pageNumber])

  const displayPublicPosts = () => {
    dispatch(fetchPublicPosts(pageNumber))
  }

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
            displayPublicPosts={displayPublicPosts}
          />

          <section id='feeds-screen' className='feeds-screen'>
            <InfiniteScroll
              pageStart={pageNumber}
              loadMore={fetchPublicPosts}
              hasMore={posts.length > 0}
              initialLoad={false}
            >
              {posts.length !== 0
                ? posts
                    .sort((a, b) => {
                      return b.createdAt - a.createdAt
                    })
                    .map(post => (
                      <>
                        <Feed post={post} key={post._id} />
                      </>
                    ))
                : 'There is no post'}
            </InfiniteScroll>
          </section>
        </>
      ) : (
        <>
          <ChangeFeedView
            cardActiveColour={cardActiveColour}
            listActiveColour={listActiveColour}
            cardViewHandler={cardViewHandler}
            listViewHandler={listViewHandler}
            displayPublicPosts={displayPublicPosts}
          />

          <section id='feeds-screen' className='feeds-screen'>
            <InfiniteScroll
              pageStart={page}
              loadMore='Function'
              hasMore='Boolean'
              initialLoad={false}
            >
              {posts.length !== 0
                ? posts
                    .sort((a, b) => {
                      return b.createdAt - a.createdAt
                    })
                    .map(post => (
                      <>
                        <FeedCompact post={post} key={post._id} />
                      </>
                    ))
                : 'There is no post'}
            </InfiniteScroll>
          </section>
        </>
      )}
    </>
  )
}

export default FeedsScreen
