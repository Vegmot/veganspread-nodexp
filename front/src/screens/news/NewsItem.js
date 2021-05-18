import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import styles from './NewsItem.module.css'

const NewsItem = ({ newsItem }) => {
  return (
    <>
      <Link to={newsItem.url} className={styles['newsitem-link']}>
        <div className={styles['each-news-item']} id='each-news-item'>
          <div className={styles['news-item-container']}>
            <div className={styles['news-item-title']}>
              <h2>{newsItem.title}</h2>
            </div>

            <div className={styles['news-item-image']}>
              <Image src={newsItem.urlToImage} alt={newsItem.description} />
            </div>

            <div className={styles['news-item-content']}>
              <p>
                {newsItem.content ? newsItem.content : newsItem.description}
              </p>
            </div>

            <div className={styles['news-item-author']}>
              <h4>{newsItem.author && 'Written by ' + newsItem.author}</h4>
            </div>

            <div className={styles['news-item-timestamp']}>
              <small>{newsItem.publishedAt.toString().substring(0, 10)}</small>
            </div>

            {newsItem.source.name ? (
              <div className={styles['news-item-source']}>
                <small>
                  <em>Source: {newsItem.source.name}</em>
                </small>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </Link>
    </>
  )
}

export default NewsItem
