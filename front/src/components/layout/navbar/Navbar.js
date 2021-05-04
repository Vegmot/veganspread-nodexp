import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Image, Menu } from 'semantic-ui-react'
import SignedInMenu from '../navbar/SignedInMenu'
import SignedOutMenu from '../navbar/SignedOutMenu'

import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <Menu inverted fixed='top' id='header-navbar' className='header-navbar'>
        <Container>
          <Menu.Item
            as={NavLink}
            exact
            to='/'
            header
            style={{ background: 'transparent' }}
          >
            <Image
              src='/assets/fortunecookie.png'
              alt='fortune cookie logo'
              style={{ width: '25px' }}
            />
          </Menu.Item>

          <Menu.Item as={NavLink} to='/news' name='News' />

          <Menu.Item as={NavLink} to='/about' name='About' />

          <Menu.Item as={NavLink} to='/contact' name='Contact' />

          <SignedOutMenu />
        </Container>
      </Menu>
    </>
  )
}

export default Navbar
