import React, { useState } from 'react'
import { displayTimestamp } from '../../../utils/displayTimestamp'

import styles from './EachComment.module.css'

const EachComment = ({ comment }) => {
  const [showMore, setShowMore] = useState(false)

  const displayTextLength = 100

  return (
    <>
      <div key={comment.commentID} className={styles['each-feed-each-comment']}>
        <p>
          <span>
            <strong>{comment.displayName}</strong>
          </span>{' '}
          {comment.text && comment.text.length > displayTextLength
            ? showMore
              ? comment.text + ' '
              : comment.text.substring(0, displayTextLength) + '... '
            : comment.text + ' '}
          {comment.text && comment.text.length > displayTextLength && (
            <button
              className={styles['show-remaining-comment-text']}
              onClick={() => setShowMore(!showMore)}
            >
              <small style={{ color: '#aaa' }}>
                {showMore ? 'Show less' : 'Show more'}
              </small>
            </button>
          )}
        </p>

        <div className='comment-timestamp'>
          <small style={{ color: '#aaa' }}>
            {displayTimestamp(Date.now(), comment.createdAt)}
          </small>
        </div>
      </div>
    </>
  )
}

export default EachComment
