import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewsItem from './NewsItem'

import './NewsScreen.css'

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([])
  const endpoint = 'Top Headlines'
  const country = 'us'
  const [loading, setLoading] = useState(false)

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
