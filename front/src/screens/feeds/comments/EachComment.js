import React, { useState } from 'react'
import { displayTimestamp } from '../../../utils/displayTimestamp'
import { Image } from 'semantic-ui-react'

import styles from './EachComment.module.css'

const EachComment = ({ comment }) => {
  const [showMore, setShowMore] = useState(false)

  const displayTextLength = 100

  return (
    <>
      <div key={comment.commentID} className={styles['each-feed-each-comment']}>
        <Image src={comment.avatar} circular size='mini' />

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
      </div>

      <div className={styles['comment-timestamp']}>
        <small style={{ color: '#aaa' }}>
          {displayTimestamp(Date.now(), comment.createdAt)}
        </small>
      </div>
    </>
  )
}

export default EachComment
