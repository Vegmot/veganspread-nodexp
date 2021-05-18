import React, { useState, useRef, useCallback } from 'react'
import NewsItem from './NewsItem'
import { useNewsInfiniteScroll } from '../../utils/useInfiniteScroll'
import { Loader } from 'semantic-ui-react'

import styles from './NewsScreen.module.css'

const NewsScreen = () => {
  const endpoint = 'Top Headlines'
  const country = 'us'
  const newsPerPage = 4
  const maxNews = 20

  const [page, setPage] = useState(1)
  const { loading, error, news, hasMore } = useNewsInfiniteScroll(
    page,
    country,
    newsPerPage,
    maxNews
  )

  const observer = useRef()
  const lastNewsRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPN => prevPN + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <>
      <section id='news-screen' className={styles['news-screen']}>
        <h1>
          {endpoint} in the {country.toUpperCase()}
        </h1>

        {news &&
          news
            .sort((a, b) => {
              return b.publishedAt - a.publishedAt
            })
            .map((newsItem, index) => {
              if (news.length === index + 1) {
                return (
                  <div ref={lastNewsRef} key={index}>
                    <NewsItem newsItem={newsItem} />
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <NewsItem newsItem={newsItem} />
                  </div>
                )
              }
            })}
        {loading && (
          <Loader
            active
            size='big'
            inline='centered'
            style={{ marginTop: '36vh' }}
          />
        )}
        {error && <p>{error}</p>}
      </section>
    </>
  )
}

export default NewsScreen
