import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import SignedInMenu from '../navbar/SignedInMenu';
import SignedOutMenu from '../navbar/SignedOutMenu';

const Navbar = () => {
  const loginUser = useSelector(state => state.loginUser);
  const { userData } = loginUser;

  return (
    <>
      <section className='flex items-center justify-between bg-black text-gray-50 h-12 md:h-20 sticky top-0 z-50 md:w-screen mx-auto'>
        <div className='ml-6 md:ml-20'>
          <Menu.Item
            as={NavLink}
            exact
            to='/'
            header
            style={{ background: 'transparent' }}
          >
            <h1 className='text-2xl'>
              <i className='home icon' />
            </h1>
          </Menu.Item>
        </div>

        <div className='mr-6 md:mr-20'>
          {userData ? <SignedInMenu /> : <SignedOutMenu />}
        </div>
      </section>
    </>
  );
};

export default Navbar;
