import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { logout } from '../../../actions/userActions'

const SignedInMenu = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  const logOutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Menu.Item position='right'>
        <Image
          avatar
          spaced='right'
          src={userData.avatar || '/assets/user.png'}
        />
        <Dropdown pointing='top left' text={userData.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${userData._id}`}
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
              onClick={logOutHandler}
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
