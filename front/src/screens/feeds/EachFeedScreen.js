import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';
import { displayTimestamp } from '../../utils/displayTimestamp';
import EachComment from './comments/EachComment';

import styles from './EachFeedScreen.module.css';

const EachFeedScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pid = match.params.id;

  const [loadingPost, setLoadingPost] = useState(false);
  const [post, setPost] = useState({});
  const [topComments, setTopComments] = useState([]);

  useEffect(() => {
    fetchPost(pid);
    getTopThreeComments(pid);
  }, [pid]);

  const fetchPost = async postID => {
    setLoadingPost(true);
    const res = await axios.get(`/api/posts/${postID}`);

    const post = res.data;
    setPost(post);
    setLoadingPost(false);
  };

  const getTopThreeComments = async postID => {
    const res = await axios.get(`/api/comments/${postID}/top3`);

    const comments = res.data;
    setTopComments(comments);
  };

  const [heartName, setHeartName] = useState('heart outline');
  const [heartColour, setHeartColour] = useState('black');
  const [bookmarkName, setBookmarkName] = useState('bookmark outline');
  const [bookmarkColour, setBookmarkColour] = useState('black');

  const loginUser = useSelector(state => state.loginUser);
  const { userData } = loginUser;

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
      <Button
        icon='angle left'
        onClick={history.goBack}
        style={{
          background: 'transparent',
          padding: '2.5%',
          marginTop: '2.5%',
          fontSize: '1.25rem',
        }}
      />

      <section id='each-feed-screen' className={styles['each-feed-screen']}>
        <div className={styles['each-feed-contents-area']}>
          <div className={styles['each-feed-container']}>
            <div className={styles['each-feed-content-image']}>
              <Image src={post.image || ''} fluid centered alt='Sample image' />
            </div>

            <div className={styles['each-feed-details']}>
              {post.isAd ? (
                <>
                  <Icon
                    link
                    className={styles['each-feed-details-icon']}
                    name='paper plane outline'
                    size='large'
                  />
                </>
              ) : (
                <>
                  <Icon
                    link
                    className={styles['each-feed-details-icon']}
                    name={heartName}
                    color={heartColour}
                    onClick={heartFillHandler}
                    size='large'
                  />

                  <Link to={`/feed/${pid}/comments`} style={{ color: '#000' }}>
                    <Icon
                      link
                      className={styles['each-feed-details-icon']}
                      name='comment outline'
                      size='large'
                    />
                  </Link>

                  <Icon
                    link
                    className={styles['each-feed-details-icon']}
                    name='paper plane outline'
                    size='large'
                  />
                  <Icon
                    link
                    className={styles['each-feed-details-icon']}
                    name={bookmarkName}
                    color={bookmarkColour}
                    onClick={bookMarkHandler}
                    size='large'
                    style={{ float: 'right' }}
                  />
                </>
              )}
            </div>

            <div className={styles['each-feed-timestamp']}>
              <small style={{ color: '#aaa ' }}>
                {post.isAd ? '' : displayTimestamp(Date.now(), post.createdAt)}
              </small>
            </div>

            <div className={styles['each-feed-content-text']}>
              <Image src={post.avatar} circular size='mini' />
              <p>
                <span className={styles['each-feed-content-text-user']}>
                  {post.isAd ? (
                    <Icon name='shopping bag' style={{ color: '#01b5ac' }} />
                  ) : (
                    <strong>{post.displayName}</strong>
                  )}
                </span>{' '}
                {post.text}
              </p>
            </div>
          </div>
        </div>

        <div className={styles['split-line']}></div>

        <div className={styles['top-comments']}>
          {topComments && topComments.length > 0 ? (
            topComments.map(comment => (
              <>
                <EachComment comment={comment} />
              </>
            ))
          ) : (
            <div
              className={styles['no-comments']}
              style={{ marginBottom: '1vh' }}
            >
              <Icon name='exclamation circle' />
              <p>No comments yet</p>
            </div>
          )}

          {topComments && topComments.length > 0 && (
            <Link to={`/feed/${post._id}/comments`} style={{ color: 'teal' }}>
              <small>Load more comments...</small>
            </Link>
          )}
        </div>
      </section>
      <div className={styles['space-below-each-feed']}></div>
    </>
  );
};

export default withRouter(EachFeedScreen);
