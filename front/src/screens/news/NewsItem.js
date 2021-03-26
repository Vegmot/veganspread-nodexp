import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import './NewsItem.css'

const NewsItem = ({ newsItem }) => {
  return (
    <>
      <Link to={newsItem.url} className='newsitem-link'>
        <div className='each-news-item' id='each-news-item'>
          <div className='news-item-container'>
            <div className='news-item-title'>
              <h2>{newsItem.title}</h2>
            </div>

            <div className='news-item-image'>
              <Image src={newsItem.urlToImage} alt={newsItem.description} />
            </div>

            <div className='news-item-content'>
              <p>
                {newsItem.content ? newsItem.content : newsItem.description}
              </p>
            </div>

            <div className='news-item-author'>
              <h4>{newsItem.author && 'Written by ' + newsItem.author}</h4>
            </div>

            <div className='news-item-timestamp'>
              <small>{newsItem.publishedAt.toString().substring(0, 10)}</small>
            </div>

            {newsItem.source.name ? (
              <div className='news-item-source'>
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
