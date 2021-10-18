import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import { displayTimestamp } from '../../utils/displayTimestamp';

const Feed = ({ post }) => {
  const [heartName, setHeartName] = useState('heart outline');
  const [heartColour, setHeartColour] = useState('black');
  const [bookmarkName, setBookmarkName] = useState('bookmark outline');
  const [bookmarkColour, setBookmarkColour] = useState('black');

  const heartFillHandler = () => {
    if (heartName === 'heart outline' && heartColour === 'black') {
      setHeartName('heart');
      setHeartColour('red');
    } else {
      setHeartName('heart outline');
      setHeartColour('black');
    }
  };

  const bookMarkHandler = () => {
    if (bookmarkName === 'bookmark outline' && bookmarkColour === 'black') {
      setBookmarkName('bookmark');
      setBookmarkColour('teal');
    } else {
      setBookmarkName('bookmark outline');
      setBookmarkColour('black');
    }
  };

  return (
    <>
      <div
        className='border-t border-b md:border my-4 md:mx-auto md:shadow-xl'
        style={{ maxWidth: '600px' }}
      >
        <div className='flex items-center ml-2 my-1 md:my-3'>
          <img
            src={post.avatar}
            className='rounded-full h-12'
            alt={`${post.displayName}`}
          />
          <p className='ml-2'>
            <span className='md:text-lg'>
              <strong>
                {post.isAd ? (
                  <span style={{ color: '#01b5ac' }}>Advertisement</span>
                ) : (
                  <Link to={`/user/${post.user}`} className=''>
                    {post.displayName}
                  </Link>
                )}
              </strong>
            </span>
          </p>
        </div>

        <div className=''>
          <Link to={`/feed/${post._id}`}>
            <Image src={post.image} fluid centered alt='Sample image' />
          </Link>
        </div>

        <div className='my-2 px-2 md:px-4'>
          {post.isAd ? (
            <>
              <Icon link className='' name='paper plane outline' size='large' />
            </>
          ) : (
            <>
              <Icon
                link
                className=''
                name={heartName}
                color={heartColour}
                onClick={heartFillHandler}
                size='large'
              />

              <Link to={`/feed/${post._id}/comments`}>
                <Icon link className='' name='comment outline' size='large' />
              </Link>

              <Icon link className='' name='paper plane outline' size='large' />
              <Icon
                link
                className=''
                name={bookmarkName}
                color={bookmarkColour}
                onClick={bookMarkHandler}
                size='large'
                style={{ float: 'right' }}
              />
            </>
          )}
        </div>

        <div className='px-2 md:px-4 md:mt-2 md:mb-4'>
          <p>
            <span className=''>
              {post.isAd ? (
                <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
              ) : (
                <strong>{post.displayName}</strong>
              )}
            </span>{' '}
            {post.text && post.text.length > 200
              ? post.text.substring(0, 200)
              : post.text}
          </p>
        </div>

        <div className='px-2 mb-3 md:px-4'>
          <small className='text-gray-500'>
            {post.isAd ? '' : displayTimestamp(Date.now(), post.createdAt)}
          </small>
        </div>
      </div>
    </>
  );
};

export default Feed;
