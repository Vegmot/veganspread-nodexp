import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewsItem from './NewsItem'

import './NewsScreen.css'

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([])
  const endpoint = 'Top Headlines'
  const country = 'us'
  const [isBottom, setIsBottom] = useState(false)
  const [loading, setLoading] = useState(false)

  // if the scroll bar reaches 60 pixels from the bottom
  // isBottom will be set to true
  // and another api call get request will be made
  const howManyPixelsFromBottom = 60

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // fetchNewsData()
  }, [])

  const fetchNewsData = async () => {
    const res = await axios({
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
      params: { _limit: 10 },
    })

    setNewsData(res.data.articles)
    setLoading(false)
  }

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight

    // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (
      scrollTop + window.innerHeight + howManyPixelsFromBottom >=
      scrollHeight
    ) {
      setIsBottom(true)
      setLoading(true)
      console.log('Fetch more items')
    }
  }

  return (
    <>
      <section id='news-screen' className='news-screen'>
        <h1>
          {endpoint} in the {country.toUpperCase()}
        </h1>

        {newsData &&
          newsData
            .sort((a, b) => {
              return b.publishedAt - a.publishedAt
            })
            .map((newsItem, index) => (
              <NewsItem newsItem={newsItem} key={index} />
            ))}
        {loading && 'Loading more news...'}
      </section>
    </>
  )
}

export default NewsScreen
