import React from 'react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../modals/modalReducer';

const CreatePostButton = () => {
  const dispatch = useDispatch();

  const loginUser = useSelector(state => state.loginUser);
  const { userData } = loginUser;

  const handleCheckUserData = () => {
    if (!userData) {
      return () => dispatch(openModal({ modalType: 'LoginForm' }));
    } else {
      return () => dispatch(openModal({ modalType: 'PostForm' }));
    }
  };

  return (
    <div>
      <button
        className='bg-transparent text-gray-700'
        onClick={
          !userData
            ? () => dispatch(openModal({ modalType: 'LoginForm' }))
            : () => dispatch(openModal({ modalType: 'PostForm' }))
        }
      >
        <i className='plus icon' />
      </button>
    </div>
  );
};

export default CreatePostButton;
