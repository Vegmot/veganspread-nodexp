import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'

const SignedInMenu = () => {
  const currentUser = null

  const signOutHandler = () => {}

  return (
    <>
      <Menu.Item position='right'>
        <Image
          avatar
          spaced='right'
          src={currentUser.photoURL || '/assets/user.png'}
        />
        <Dropdown pointing='top left' text={currentUser.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to='/createEvent'
              text='Create Event'
              icon='plus'
            />

            <Dropdown.Item
              as={Link}
              to={`/profile/${currentUser.uid}`}
              text='My profile'
              icon='user'
            />

            <Dropdown.Item
              as={Link}
              to='/account'
              text='My account'
              icon='settings'
            />

            <Dropdown.Item
              onClick={signOutHandler}
              text='Sign out'
              icon='power'
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  )
}

export default SignedInMenu
