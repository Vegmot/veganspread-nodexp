import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { openModal } from '../../modals/modalReducer';

const SignedOutMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Menu.Item position='right'>
        <button
          onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
          className='bg-transparent px-6 py-2'
        >
          Login
        </button>

        <button
          onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
          className='bg-teal px-6 py-2 rounded-md'
        >
          Register
        </button>
      </Menu.Item>
    </>
  );
};

export default SignedOutMenu;
